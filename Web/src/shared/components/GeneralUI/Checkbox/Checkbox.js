import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const Checkbox = props => {
  return (
    <div style={props.style}>
      {props.label ? (
        <span
          style={{
            color: props.color ? props.color : 'white',
            margin: '0 5px'
          }}
        >
          {props.label}
        </span>
      ) : null}
      <div className="checkbox__wrapper">
        <input
          type="checkbox"
          id={props.name}
          onChange={() => {
            props.onChange()
          }}
        />
        <label htmlFor={props.name}/>
      </div>
    </div>
  )
}

export default styled(Checkbox)`
  display: inline;
  position: relative;
  width: 20px;
  margin: 20px auto;
  label {
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    top: -3px;
    left: -3px;
    cursor: pointer;

    border-radius: 5px;
    border: white 1px solid;
    transition: all 0.25s ease-in-out;
  }
  input[type=checkbox] {
    visibility: hidden;
    &:checked + label {
      background-color: white;
    }
  }
`

Checkbox.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
}
