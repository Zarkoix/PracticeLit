import * as rmq from "../rabbitmq/index";
import ws, { WSMessage } from "../ws/index";
import { Connection } from "amqplib";
import WebSocket from "ws";
import { log } from "winston";

const inbound = "q_results";
const outbound = "q_java";

interface CodeSubmission {
  submissionID: number;
  questionID: number;
  code: string;
}

interface ResultsData {
  submissionID: number;
  questionID: number; // if the user switches to a different question it won't display the now irelevent test cases
  resultsData: any; // TODO: create a testData structure (type) that can be used client side
}

export default () =>
  rmq
    .initializeConnection()
    .then(connection => {
      /**
       * send messages to JTR in queue 'q_java'
       * expect messages back on 'q_results
       */
      connection.createChannel().then(channel => {
        let s2q = rmq.sendToQueue(channel, outbound);
        /**
         * when 'TestCode' WebSocket data is received send it to the queue
         */
        let nextSubmissionID = 0;
        let wsMap = new Map<number, WebSocket>();
        ws.use("TestCode", (msg: WSMessage, ws: WebSocket) => {
          if (msg.payload.questionID && msg.payload.code) { // ensure neccessary data exists in the message
            let code: CodeSubmission = {
              submissionID: nextSubmissionID,
              questionID: msg.payload.questionID,
              code: msg.payload.code
            };
            log( "info", "received CodeSubmission from client: " + code.toString());
            wsMap.set(nextSubmissionID, ws);
            ws.send(new WSMessage("CodeReceived", "").toString()); // send confirmation packet to the client
            s2q(JSON.stringify(code)); // send the stringified code object to the queue
            nextSubmissionID++; // increment submission ID to prevent conflicts
          } else { // gracefully error
            log("warn", "recieved malformed a CodeSubmission from client");
          }
        });

        rmq.initializeConsumer(channel, inbound, msg => {
          const results: ResultsData = JSON.parse(msg.content.toString());
          let submissionID: number = Number(results.submissionID) // parsing the json turns it into a string
          if (wsMap.has(submissionID)) {
            const message = new WSMessage("TestInfo", {
              questionID: results.questionID,
              testInfo: results.resultsData
            });
            wsMap.get(submissionID).send(message.toString());
            wsMap.delete(submissionID);
          } else {
            log("warn", "desync in submission ID [" + results.submissionID + "]");
          }
          channel.ack(msg)
        });
      });
    })
    .catch(err => log('error', err));
