import React from 'react';
import styled from 'styled-components'

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';

const Editor = ({className, editorContents, onChange, name}) => {
  return <AceEditor
    className={className}
    mode="java"
    theme="monokai"
    name={name ? name : "AceEditor"}
    onLoad={() => {}}
    onChange={onChange}
    fontSize={14}
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={true}
    value={editorContents}
    setOptions={{
      showLineNumbers: true,
      tabSize: 2,
    }}
    editorProps={{
      minLines: 5,
      maxLines: 60,
      width: '100%'
    }}
  />
}

export default styled(Editor)`
  width: 100% !important;
  margin-top: 5%;
  border: solid 1px white;
  border-radius: 5px;
`