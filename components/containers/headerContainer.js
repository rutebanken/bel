import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from './../../config/readConfig'

import AsyncActions from './../../actions/AsyncActions'

class HeaderContainer extends React.Component {
  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
      const {dispatch, providerId} = this.props
    }).bind(this))
  }

  render() {

    return (
      <h1>BEkL</h1>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
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
)(HeaderContainer)
