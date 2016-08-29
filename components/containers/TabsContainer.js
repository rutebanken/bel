import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from './../../config/readConfig'

import Tabs from 'muicss/lib/react/tabs'
import Tab from 'muicss/lib/react/tab'
import EventsContainer from './eventsContainer'

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
        <Tab value="events" label="events">
          <EventsContainer/>
        </Tab>
        <Tab value="status" label="status">
          <p>Status.</p>
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
