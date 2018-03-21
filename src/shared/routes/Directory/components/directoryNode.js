import React, { Component } from "react";
import styled from "styled-components";
import { primaryColor, textColor, green } from "../../../theme/theme";

import { Link } from "react-router-dom";

/*
      directory: [{
          isQuestion: false,
          id: '12345',
          children: {}
        }, {
          isQuestion: true,
          completed: false,
          id: '23456'
        }
      ]
 */

class DirectoryNode extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  static displayName(name, isQuestion = true, completed = false) {
    if (!isQuestion) return "📦 " + name;
    if (completed) return "✅ " + name;
    return "  " + name;
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.node.map(
          e =>
            e.isQuestion ? (
              <Link key={e.id} className="linkQuestion" to={"/a/" + e.id}>
                {DirectoryNode.displayName(e.name, e.isQuestion, e.completed)}
              </Link>
            ) : (
              <div key={e.id}>
                <div
                  onClick={() => this.setState({ open: !this.state.open })}
                  className="linkDirectory"
                  style={{
                    color: this.state.open ? primaryColor : textColor
                  }}
                >
                  {DirectoryNode.displayName(e.name, e.isQuestion, e.completed)}
                </div>
                {this.state.open && (
                  <div className="directory">
                    <DirectoryNode node={e.children} />
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
  }
  
  .linkDirectory {
    cursor: s-resize;
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
