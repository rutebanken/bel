import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from './../../config/readConfig'

import AsyncActions from './../../actions/AsyncActions'

import HeaderView from '../views/HeaderView'
import MainContainer from './mainContainer'
import FooterView from '../views/footerView'

export default class App extends React.Component {
  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }
  render() {
    return (
      <div className="app">
        <HeaderView/>
        <MainContainer/>
        <FooterView/>
      </div>
    )
  }
}
