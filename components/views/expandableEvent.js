import React, { Component, PropTypes } from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
const FaCheck = require('react-icons/lib/fa/check')
const FaError = require('react-icons/lib/fa/close')

export default class ExpandableEvent extends React.Component {

  render() {

    const {content, contracted} = this.props
    const className = "expandable-content " + (contracted ? "contracted" : "expanded")

    return (
      <div className={className}>
        <Row>
          <Col md="4"><b>Action</b></Col>
          <Col md="4"><b>Date</b></Col>
          <Col md="4"><b>State</b></Col>
        </Row>
        { (content && content.length) ?

          <div>{content.map( (event, index) => {
              const endStateFailed = (event.state === 'TIMEOUT' || event.state === 'ERROR' || event.state === 'FAILED')
              return (
                <Row key={"action-" + index}>
                  <Col md="4" key={"event-action-" + index}>{event.action}</Col>
                  <Col md="4" key={"event-date-" + index}>{event.date}</Col>
                  <Col md="4" key={"event-state-" + index}>{!endStateFailed ? <FaCheck color="green"/> : <FaError color="red"/>}</Col>
                </Row>
              )
            })}</div> : <div>No events found</div> }
      </div>
    )
  }
}
