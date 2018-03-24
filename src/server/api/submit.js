import express from 'express';
import rmq from '../rabbitmq';
const router = express.Router();
let sendToQueue;
// this is async so their is a time when sendToQueue is undefined,
// but it theoretically should never be called because server is still booting up
rmq.initialize('q_submit', (s2q) => sendToQueue = s2q);

router.get('/:content', async (req, res) => {
  sendToQueue(decodeURIComponent(req.params.content));
  return res.status(200).json({ // TODO return a confirmed message
    testCasesPassed: 1,
    testCasesFailed: 1,
    testCaseInfo: [{
      name: "Test Case 1",
      isPassed: true,
      givenInput: "1-5",
      expectedOutput: "12345",
      givenOutput: "12345"
    }, {
      name: "Test Case 2",
      isPassed: false,
      givenInput: "5-1",
      expectedOutput: "54321",
      givenOutput: "abcde"
    }]
  })
});

export default router;
