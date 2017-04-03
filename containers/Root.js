import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import FileUpload from './FileUpload'
import ValidationReport from './ValidationReport'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from './Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class Root extends React.Component {
  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="appContent">
          <div className="version">v{process.env.VERSION}</div>
          <Header/>
          <Main/>
          <FileUpload/>
          <ValidationReport/>
          <Footer/>
        </div>
      </MuiThemeProvider>
    )
  }
}
