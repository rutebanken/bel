import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from './../../config/readConfig'

import AsyncActions from './../../actions/AsyncActions'

import HeaderContainer from './headerContainer'
import MainContainer from './mainContainer'
import FooterContainer from './footerContainer'


class App extends React.Component {
  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }

  render() {

    const {providerId, statusList} = this.props

    return (
      <div className="app">
        <HeaderContainer/>
        <MainContainer/>
        <FooterContainer/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      providerId: state.nabuReducer.providerId
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
)(App)
