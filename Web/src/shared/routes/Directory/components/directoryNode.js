import React, { Component } from "react";
import styled from "styled-components";
import { primaryColor, textColor, green } from "../../../theme/theme";

import { Link } from "react-router-dom";

class DirectoryNode extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  static displayName(name, isQuestion = true) {
    if (!isQuestion) return "📦 " + name;
    // if (completed) return "✅ " + name; // only uncomment this if completed support is eventually added
    return "  " + name;
  }

  static isNodeQuestion(node) {
    return typeof node[1] !== 'object'
  }

  render() {
    return (
      <div className={this.props.className}>
        {Object.entries(this.props.node).map(
          e =>
            DirectoryNode.isNodeQuestion(e) ? (
              <Link key={e[0]} className="linkQuestion" to={"/a/" + e[0]}>
                {DirectoryNode.displayName(e[1], true)}
              </Link>
            ) : (
              <div key={e[0]}>
                <div
                  onClick={() => this.setState({ open: !this.state.open })}
                  className="linkDirectory"
                  style={{
                    color: this.state.open ? primaryColor : textColor
                  }}
                >
                  {DirectoryNode.displayName(e[0], false)}
                </div>
                {this.state.open && (
                  <div className="directory">
                    <DirectoryNode node={e[1]} />
                  </div>
                )}
              </div>
            )
        )}
      </div>
    );
  }
}

export default styled(DirectoryNode)`
  .linkQuestion {
    cursor: pointer;
    display: block;
  }
  
  .linkDirectory {
    cursor: s-resize;
    display: block;
  }
  
  .linkQuestion:hover {
    color: ${green} !important;
  }
  
  .linkDirectory:hover {
    color: ${primaryColor} !important;
  }
  
  .directory {
    border: 1px solid ${primaryColor};
    border-radius: 5px;
    margin-bottom: 2%
    padding: 1%;
  }
`;
