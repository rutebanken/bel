import React, { Component, PropTypes } from 'react'
import FileUpload from './FileUpload'
import Header from '../components/Header'
import Main from './Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class Root extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="appContent">
          <div className="version">v{process.env.VERSION}</div>
          <Header/>
          <Main/>
          <FileUpload/>
        </div>
      </MuiThemeProvider>
    )
  }
}
