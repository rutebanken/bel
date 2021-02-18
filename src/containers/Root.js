/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import PropTypes from "prop-types";

import React, { Component } from "react";
import FileUpload from "./FileUpload";
import Header from "../components/Header";
import Main from "./Main";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import enturTheme from "../styles/themes/entur/";
import SnackbarWrapper from "../components/SnackbarWrapper";

export default class Root extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(enturTheme)}>
        <div className="appContent">
          <div className="version">v{process.env.VERSION}</div>
          <Header />
          <Main />
          <FileUpload />
          <SnackbarWrapper />
        </div>
      </MuiThemeProvider>
    );
  }
}
