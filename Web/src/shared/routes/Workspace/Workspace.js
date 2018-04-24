import React, { Component } from "react";
import PropTypes from "prop-types";

// library components
import { Link, withRouter } from "react-router-dom";

// higher order components
import styled from "styled-components";
import socket from "../../components/Socket";

// specific custom components
import ProblemPrompt from "./components/ProblemPrompt.js";
import TestCase from "./components/TestCase";
import TestsSummary from "./components/TestsSummary";

// general custom components
import { textColor, backgroundColor, primaryColor } from "../../theme/theme";
import TitleBar from "../../components/GeneralUI/TitleBar.js";
import FlatButton from "../../components/GeneralUI/FlatButton/FlatButton";
import Footer from "../../components/Footer.js";
import universal from "react-universal-component";

let UniversalEditor = universal(import("./components/Editor"));
/*
*/

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qId: props.match.params.id,
      done: true,
      loaded: false,
      problemPrompt: "",
      solutionText:
        "public class HelloWorld {\n\tpublic static int add1(int a) { return a + 1; }\n}",
      solutionProcessing: false,
      tests: null
    };
  }

  receivedTestInfo = ({ questionID, testInfo }) => {
    if (questionID === this.state.qId) {
      this.setState({
        tests: testInfo,
        solutionProcessing: false
      });
    } else {
      console.log(
        "[ERROR] received test info for a different question than is open"
      );
    }
  };

  componentDidMount() {
    fetch("/api/r/" + this.state.qId).then(r => {
      if (r.status === 200) {
        return r.text().then(r =>
          this.setState({
            problemPrompt: r
          })
        );
      } else {
        this.props.history.push("/404");
      }
    });

    this.props.socket.registerType("TestInfo", this.receivedTestInfo);
    this.props.socket.registerType("CodeReceived", () =>
      this.setState({
        solutionProcessing: true
      })
    );
  }

  submit = () => {
    this.setState({
      tests: null
    });

    this.props.socket.send(
      JSON.stringify({
        type: "TestCode",
        questionID: this.state.qId,
        code: this.state.solutionText
      })
    );
  };

  render() {
    const canUseDOM = typeof window !== "undefined";
    return (
      <div className={this.props.className}>
        <TitleBar
          color={backgroundColor}
          textColor={textColor}
          elementLeft={<Link to="/q">🔥</Link>}
        />
        <div
          style={{
            padding: "1% 7%",
            marginBottom: "5%"
          }}
        >
          <ProblemPrompt promptText={this.state.problemPrompt} />
          {canUseDOM && (
            <UniversalEditor
              editorContents={this.state.solutionText}
              onChange={e =>
                this.setState({
                  solutionText: e // if there's performance issues, turn re-render on solutionText change off
                })
              }
            />
          )}
          <div
            style={{
              margin: "2% 0",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <FlatButton
              text={
                this.state.solutionProcessing ? "Processing..." : "Submit Code"
              }
              color={primaryColor}
              backgroundColor={backgroundColor}
              onClick={this.submit}
              disabled={this.state.solutionProcessing}
              big
            />
          </div>
          {this.state.tests ? (
            <div>
              <TestsSummary
                testErrorInfo={this.state.tests.testErrorInfo}
                testsPassed={this.state.tests.testCasesPassed}
                testsFailed={this.state.tests.testCasesFailed}
              />
              <div>
                {this.state.tests.testCaseInfo.map(c => (
                  <TestCase
                    key={c.name}
                    testCaseName={c.name}
                    isPassed={c.isPassed}
                    givenInput={c.givenInput}
                    expectedOutput={c.expectedOutput}
                    givenOutput={c.givenOutput}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

Workspace.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default styled(socket(withRouter(Workspace)))`
  background-color: ${backgroundColor};
  min-height: 100%;
  height: 100%;

  table {
    width: 100%;
    text-align: left;

    border: 1px solid white;
    border-radius: 5px;
    padding: 5px;
  }

  thead {
    color: ${primaryColor};
  }

  tbody {
    color: ${textColor};
  }

  code {
    background-color: grey;
    border-radius: 5px;
    padding: 3px;
  }
`;
