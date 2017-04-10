import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import TabsContainer from './TabsContainer'
import AsyncActions from '../actions/AsyncActions'

class Main extends React.Component {

  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
      this.props.dispatch(AsyncActions.getAllSuppliers())
    }).bind(this))
  }
  render() {

    return (
      <div>
        <TabsContainer/>
      </div>
    )
  }
}

export default connect(null)(Main)
