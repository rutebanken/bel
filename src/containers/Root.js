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

import React, { useEffect } from "react";
import FileUpload from "./FileUpload";
import Header from "../components/Header";
import Main from "./Main";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import enturTheme from "../styles/themes/entur/";
import SnackbarWrapper from "../components/SnackbarWrapper";
import { useAuth } from '@entur/auth-provider';
import { MicroFrontend } from "@entur/micro-frontend";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import AsyncActions from "../actions/AsyncActions";
import MicroFrontendWrapper from "./MicroFrontendWrapper";

const FetchStatus = props => {
  if (props.status !== 'SUCCESS' && props.status !== 'LOADING') {
    return <pre>{JSON.stringify(props)}</pre>;
  } else {
    return null;
  }
};

const Root = ({ dispatch }) => {
  const auth = useAuth();

  useEffect(() => {
    dispatch(AsyncActions.getAllSuppliers());
  }, []);


  return (
    <>
      {auth.isAuthenticated ? (
        <MuiThemeProvider muiTheme={getMuiTheme(enturTheme)}>
        <div className="appContent">
          <Header />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/netex-validation-reports/report/:codespace/:reportId">
              <MicroFrontendWrapper>
                {window.config.udugMicroFrontendUrl && (
                  <MicroFrontend
                    id="ror-udug"
                    host={window.config.udugMicroFrontendUrl}
                    path="/netex-validation-reports"
                    staticPath=""
                    name="NeTEx validation reports"
                    payload={{
                      getToken: auth.getAccessToken
                    }}
                    FetchStatus={FetchStatus}
                    handleError={(e) => console.log(e)}
                  />
                )}
              </MicroFrontendWrapper>
            </Route>
          </Switch>
          <FileUpload />
          <SnackbarWrapper />
        </div>
      </MuiThemeProvider>
      ) : null}
    </>
  );
}

export default connect()(Root);