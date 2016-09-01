import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from './../../config/readConfig'

import Tabs from 'muicss/lib/react/tabs'
import Tab from 'muicss/lib/react/tab'
import EventsContainer from './eventsContainer'
import StatusView from '../views/statusView'
import MdEvents from 'react-icons/lib/md/event'
import MdReport from 'react-icons/lib/md/report'
import AsyncActions from './../../actions/AsyncActions'

class TabsContainer extends React.Component {
  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }

  render() {

    const {events} = this.props

    return (
      <Tabs justified={true} initialSelectedIndex={0}>
        <Tab value="status" label="status">
          <StatusView/>
        </Tab>
        <Tab className="event-header" value="events" label={"Events"}>
          <EventsContainer/>
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.nabuReducer.events
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsContainer)
