import React, { Component, PropTypes } from 'react'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

const ReportView = (props) => {

    const possibleStatus = ["Warnings", "Succesful", "Errors"]

    const items = [
      {
        status: props.status === "ALL" ? possibleStatus[Math.floor(Math.random() * 3)] : props.status,
        line: "Rådhuset - Langøyene (B4)"
      },
      {
        status: props.status === "ALL" ? possibleStatus[Math.floor(Math.random() * 3)] : props.status,
        line: "Nakkholmen (B4)"
      },
      {
        status: props.status === "ALL" ? possibleStatus[Math.floor(Math.random() * 3)] : props.status,
        line: "Stovner T - Furuset T (65)"
      }
    ]

    const reportViewStyle = { marginTop: "60px", border: "1px solid black", marginRight: "8px", marginLeft: "8px" }
    const headerSyle = { fontWeight: "600"}

    const rowContent = items.map( (item, index) => {
      const rowStyle = !(index % 2) ? { background: "#eee"} : { background: "#fff"}
      return (
        <Row key={"row-" + index} style={rowStyle}>
          <Col md="4">{item.status}</Col>
          <Col md="7">{item.line}</Col>
          <Col md="1"><span>+</span></Col>
        </Row>
      )
    })

    return (
      <div style={reportViewStyle}>
        <Container fluid={true}>
          <Row>
            <Col md="4"><span style={headerSyle}>Status</span></Col>
            <Col md="7"><span style={headerSyle}>Line</span></Col>
          </Row>
          {rowContent}
        </Container>
      </div>
    )

}

export default ReportView
