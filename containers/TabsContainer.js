import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import {Tabs, Tab} from 'material-ui/Tabs'
import Events from './Events'
import Status from './Status'
import AsyncActions from '../actions/AsyncActions'
import CircularProgress from 'material-ui/CircularProgress'

class TabsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'status'
    }
  }

  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }

  handleChange(value) {
    this.setState({
      value: value
    })
  }

  render() {

    const { events, dispatch, lineStats } = this.props

    return (
      <Tabs
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          tabItemContainerStyle={{background: '#2F2F2F'}}
       >
        <Tab value="status" label="status">
          { lineStats.isLoading
            ? <div style={{position: 'absolute', marginLeft: '40%', marginTop: '20%'}}><CircularProgress size={120} thickness={5}/></div>
            : <Status stats={lineStats} dispatch={dispatch}/>
          }
        </Tab>
        <Tab className="event-header" value="events" label={"Events"}>
          <Events/>
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.nabuReducer.events,
    lineStats: state.nabuReducer.lineStats
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
