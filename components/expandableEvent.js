import React, { Component, PropTypes } from 'react'
import Error from 'material-ui/svg-icons/alert/error'
import Success from 'material-ui/svg-icons/action/done'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { color } from '../components/styles'

export default class ExpandableEvent extends React.Component {

  render() {

    const { pageItem, index, hidden } = this.props
    const headerStyle = { fontWeight: 600, marginTop: 10 }
    const itemStyle = { display: 'block', lineHeight: 2, marginTop: 10}

    if (hidden) {
      return null
    }

    return (

      <TableRow
        key={"expanded-row-" + index}
        style={{background: color.tableRow, borderBottom: '1px solid black'}}
        selectable={false}
        >

        <TableRowColumn colSpan="4"
          style={{padding: 20}}
          >
          <span style={headerStyle}>Type</span>
          { pageItem.events.map( (event, index) => (
            <span key={"action-"+index} style={itemStyle}>{event.actionString}</span>
          ))}
        </TableRowColumn>
        <TableRowColumn colSpan="5"
          style={{padding: 20}}>
          <span style={headerStyle}>Dato</span>
          { pageItem.events.map( (event, index) => (
            <span key={"date-"+index}  style={itemStyle}>{event.date}</span>
          ))}
        </TableRowColumn>
        <TableRowColumn colSpan="2"
          style={{padding: 20}}
          >
          <span style={headerStyle}>Sluttilstand</span>
            { pageItem.events.map( (event, index) => {

              const endStateFailed = (event.state === 'TIMEOUT' || event.state === 'ERROR'
                || event.state === 'FAILED')

              return (
                  <div key={"status-"+index} style={{marginLeft: 15, marginTop: 10}}>
                    {endStateFailed ? <Success color="green"/> : <Error color="red"/>}
                  </div>
              )
          })}
        </TableRowColumn>
        <TableRowColumn
          style={{background: color.tableRow}}
          colSpan="1"
          >
        </TableRowColumn>
      </TableRow>
    )
  }
}
