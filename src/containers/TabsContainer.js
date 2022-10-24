import { connect } from "react-redux";

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

import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import Events from "./Events";
import { withRouter } from "react-router-dom";
import { MicroFrontendFetchStatus } from "../components/MicroFrontendFetchStatus";
import { MicroFrontend } from "@entur/micro-frontend";
import { Loader } from "@entur/loader";

class TabsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(value) {
    this.props.history.push(`/${value}`);
  }

  render() {
    const { currentSupplier, auth, isLoading } = this.props;

    return (
      <Tabs
        value={this.props.tab}
        onChange={this.handleChange.bind(this)}
        inkBarStyle={{ height: 7, bottom: 5, background: "#FF5959" }}
      >
        <Tab value="status" label="Linjestatus" style={{ marginTop: 10 }}>
          {this.props.tab === "status" && currentSupplier && !isLoading ? (
            <>
              {window.config.ninsarMicroFrontendUrl && (
                <MicroFrontend
                  id="ror-ninsar"
                  host={window.config.ninsarMicroFrontendUrl}
                  staticPath=""
                  name="Line statistics"
                  payload={{
                    providerId: `${currentSupplier.id}`,
                    getToken: auth.getAccessToken,
                    locale: "NO",
                    showNumberOfLinesCard: true,
                    showDeliveryDateCard: true,
                    showExpiringDaysCard: true,
                  }}
                  FetchStatus={(props) => (
                    <MicroFrontendFetchStatus
                      {...props}
                      label="Error loading line statistics"
                    />
                  )}
                  handleError={(error) => console.log(error)}
                />
              )}
            </>
          ) : (
            <Loader style={{ width: "100%" }}>Laster</Loader>
          )}
        </Tab>
        <Tab
          className="event-header"
          value="events"
          label="Dataleveranser"
          style={{ marginTop: 10 }}
        >
          {this.props.tab === "events" && currentSupplier && !isLoading ? (
            <MicroFrontend
              id="ror-zagmuk"
              host="https://timetable-admin.dev.entur.org"
              staticPath=""
              name="Events"
              payload={{
                providerId: `${currentSupplier.id}`,
                getToken: auth.getAccessToken,
                locale: "nb",
                env: "dev",
                hideIgnoredExportNetexBlocks: true,
                hideAntuValidationSteps: false,
                navigate: (url) => history.push(url),
              }}
              FetchStatus={(props) => (
                <MicroFrontendFetchStatus
                  {...props}
                  label="Error loading events"
                />
              )}
              handleError={(error) => console.log(error)}
            />
          ) : null}
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => ({
  currentSupplier: state.asyncReducer.currentSupplier,
  isLoading: state.asyncReducer.isLoading,
  auth: state.userReducer.auth,
});

export default withRouter(connect(mapStateToProps)(TabsContainer));
