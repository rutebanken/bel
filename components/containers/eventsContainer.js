import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../../config/readConfig'
import { bindActionCreators } from 'redux'

import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from 'muicss/lib/react/button'
const FaChevronDown = require('react-icons/lib/fa/chevron-down')
const FaChevronUp  = require('react-icons/lib/fa/chevron-up')
const FaCheck = require('react-icons/lib/fa/check')
const FaError = require('react-icons/lib/fa/close')

import UserActions from './../../actions/UserActions'
import ExpandableEvent from '../views/expandableEvent'


class EventsContainer extends React.Component {

  componentWillMount(){
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }

  handleExpandContent (id) {
    const {dispatch} = this.props
    dispatch(UserActions.toggleEventsExpanable(id))
  }

  handlePageClick (e, pageIndex) {
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(UserActions.setActiveEventsPage(pageIndex))
  }

  handleSortForField(fieldName) {
    const {dispatch} = this.props
    dispatch(UserActions.sortEventsByField(fieldName))
    console.log("this happens??")
  }

  handleUploadFile() {
    const {dispatch} = this.props
    dispatch(UserActions.openFileUploadDialog())
  }

  render() {

    const {currentPage, pages, pageIndex, expandedEvents} = this.props

    if (currentPage && currentPage.length && pages) {

      return (

        <div>
          <Container fluid={true}>
            <Row>
              <Col md="10">
                <div className="page-link-parent">
                  <span className="ml-17">Pages: </span>
                  {pages.map ( (page, index) => {
                    const isActive = (index == pageIndex) ? 'page-link active-link' : 'page-link inactive-link'
                    return <span className={isActive} onClick={(e) => this.handlePageClick(e, index)} key={"link-" + index}>{index}</span>
                  })}
                </div>
              </Col>
              <Col md="2">
                <Button variant="fab" onClick={ () => this.handleUploadFile() } color="primary">+</Button>
              </Col>
            </Row>
            <Row>
              <Col md="4">
              <div className="table-header" onClick={ () => this.handleSortForField("fileName") }>Filename</div>
              </Col>
              <Col md="1">
                <div className="table-header" onClick={ () => this.handleSortForField("endState") }>Status</div>
              </Col>
              <Col md="2">
              <div className="table-header" onClick={ () => this.handleSortForField("firstEvent") }>Started</div>
              </Col>
              <Col md="2">
              <div className="table-header" onClick={ () => this.handleSortForField("lastEvent") }>Ended</div>
              </Col>
              <Col md="2">
              <div className="table-header" onClick={ () => this.handleSortForField("duration") }>Duration</div>
              </Col>
            </Row>
          </Container>

          <Container fluid={true}>

            {currentPage.map ( (pageItem, index) => {

              const endStateFailed= (pageItem.endState === 'TIMEOUT' || pageItem.endState === 'ERROR'
                    || pageItem.endState === 'FAILED')
              const contracted = expandedEvents.indexOf(index) == -1

              return (

                <div className="jobstatus-wrapper" key={"jobstatus-wrapper-" + index}>
                  <Row key={"k-" + index}>
                    <Col md="4"><p><span className="long-text">{pageItem.fileName}</span></p></Col>
                    <Col md="1">{ !endStateFailed ? <FaCheck color="green"/> : <FaError color="red"/>}</Col>
                    <Col md="2"><p>{pageItem.firstEvent}</p></Col>
                    <Col md="2"><p>{pageItem.lastEvent}</p></Col>
                    <Col md="2"><p>{pageItem.duration}</p></Col>
                    <Col md="1">
                      <div onClick={() => this.handleExpandContent(index)}>
                        { contracted ? <FaChevronDown/> : <FaChevronUp/> }
                      </div>
                    </Col>
                  </Row>
                  <Row key={"expandable-" + index}>
                    <ExpandableEvent contracted={contracted} content={pageItem.events} key={"exp-"+index}/>
                  </Row>
                </div>
              )
            })}
          </Container>

        </div>
      )

    } else {
      return (
        <Container fluid={true}>
          <Row>
            <Col md="8">
              <p>No events found</p>
            </Col>
            <Col md="2">
              <Button variant="fab" onClick={ () => this.handleUploadFile() } color="primary">+</Button>
            </Col>
          </Row>
        </Container>
      )
    }

  }
}

const mapStateToProps = (state, ownProps) => {

  var paginationMap = []
  var list = state.nabuReducer.events


  if (list && list.length) {
    for (let i = 0, j = list.length; i < j; i+=10) {
      paginationMap.push(list.slice(i,i+10))
    }
  }

  const pageIndex = state.userReducer.eventPageIndex

  return {
    pageIndex: pageIndex,
    currentPage: paginationMap[pageIndex],
    pages: paginationMap,
    expandedEvents: state.userReducer.expandedEvents
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)
