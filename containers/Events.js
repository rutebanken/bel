import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import { bindActionCreators } from 'redux'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Error from 'material-ui/svg-icons/alert/error'
import Success from 'material-ui/svg-icons/action/done'
import UserActions from '../actions/UserActions'
import ExpandableEvent from '../components/expandableEvent'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Upload from 'material-ui/svg-icons/file/file-upload'

class Events extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expandedEventId: -1,
      pageIndex: 0
    }
  }

  componentWillMount(){
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }

  handlePageClick (e, pageIndex) {
    e.preventDefault()
    this.setState({
      expandedEventId: -1,
      pageIndex: pageIndex
    })
  }


  handleUploadFile() {
    const {dispatch} = this.props
    dispatch(UserActions.openFileUploadDialog())
  }

  handleCellClick(row, cell) {
    if (!(row % 2)) {

      let expandedRowIndex = row/2
      let shouldBeRemoved = expandedRowIndex === this.state.expandedEventId

      this.setState({
        ...this.state,
        expandedEventId: shouldBeRemoved ? -1 : expandedRowIndex
      })
    }
  }

  render() {

    const { pages } = this.props
    const { expandedEventId, pageIndex } = this.state
    const currentPage = pages[pageIndex]

    return (
      <div>
        <div style={{padding: 20}}>
          <FlatButton
            label="Last opp datasett"
            labelPosition="before"
            primary={true}
            onClick={this.handleUploadFile.bind(this)}
            icon={<Upload/>}
            style={{float: 'right'}}
          />
        </div>
        { (currentPage && currentPage.length && pages)
          ?
          <div>
            <div style={{marginLeft: 5}}>
              { pages.map( (page, index) => {

                let isActive = (pageIndex == index)
                let activeStyle = isActive
                  ? { color: 'rgb(0, 188, 212)', cursor: 'pointer' }
                  : { cursor: 'pointer'}

                return (<div
                  style={{display: 'inline-block', marginLeft: 5}}
                  key={'page-'+index}
                  >
                    <div style={activeStyle} onClick={(e) => { !isActive && this.handlePageClick(e, index)}}>
                      {index+1}
                    </div>
                </div>)
              })}
            </div>
            <Table
              onCellClick={this.handleCellClick.bind(this)}
              >
              <TableHeader
                selectable={false}
                displaySelectAll={false}
                adjustForCheckbox={false}
                >
                <TableRow>
                  <TableHeaderColumn colSpan="4">Filnavn</TableHeaderColumn>
                  <TableHeaderColumn colSpan="2">Status</TableHeaderColumn>
                  <TableHeaderColumn colSpan="3">Startet</TableHeaderColumn>
                  <TableHeaderColumn colSpan="3">Varighet</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
                showRowHover={false}
                >
                {currentPage.map ( (pageItem, index) => {

                  const endStateFailed= (pageItem.endState === 'TIMEOUT' || pageItem.endState === 'ERROR'
                        || pageItem.endState === 'FAILED')

                  const chouetteRow = (
                      <TableRow
                        key={"chouette-row-" + index}
                        style={{background: '#ebf2f1'}}
                        >
                        <TableRowColumn colSpan="4">
                            {pageItem.fileName}
                        </TableRowColumn>
                        <TableRowColumn colSpan="2">
                          { endStateFailed ? <Success color="green"/> : <Error color="red"/>}
                        </TableRowColumn>
                        <TableRowColumn colSpan="3">
                          {pageItem.firstEvent}
                        </TableRowColumn>
                        <TableRowColumn colSpan="3">
                          {pageItem.duration}
                        </TableRowColumn>
                      </TableRow>
                  )

                  const expandedRowVisibility = expandedEventId !== index

                  const expandedRow = (
                    <ExpandableEvent pageItem={pageItem} hidden={expandedRowVisibility}/>
                  )

                  return [chouetteRow,expandedRow]

                })}
              </TableBody>
            </Table>
          </div>
        :
        <div style={{padding: 40, background: '#ffffdb', marginTop: 40, fontWeight: 500}}>Ingen tidligere leveranser.</div>
      }
      </div>
  )}
}

const mapStateToProps = (state, ownProps) => {

  var paginationMap = []
  var list = state.asyncReducer.events

  if (list && list.length) {
    for (let i = 0, j = list.length; i < j; i+=10) {
      paginationMap.push(list.slice(i,i+10))
    }
  }

  return {
    pages: paginationMap
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
