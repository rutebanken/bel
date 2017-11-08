import React, { Component, PropTypes } from 'react';
import FileUpload from './FileUpload';
import Header from '../components/Header';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import enturTheme from '../styles/themes/entur/';
import SnackbarWrapper from '../components/SnackbarWrapper';

export default class Root extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(enturTheme)}>
        <div className="appContent">
          <div className="version">v{process.env.VERSION}</div>
          <Header />
          <Main />
          <FileUpload />
          <SnackbarWrapper/>
        </div>
      </MuiThemeProvider>
    );
  }
}
