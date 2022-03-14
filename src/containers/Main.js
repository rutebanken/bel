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
import TabsContainer from "./TabsContainer";
import { withRouter } from "react-router-dom";

class Main extends React.Component {
  handleLogout() {
    const { auth } = this.props;
    auth.logout({ returnTo: window.location.origin });
  }

  render() {
    const { noOrganisations, match } = this.props;
    let tab = 'status';

    if (match.params.tab) {
      if (match.params.tab === 'events') {
        tab = 'events'
      }
    }

    if (!noOrganisations) {
      return (
        <div>
          <TabsContainer tab={tab} />
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ marginTop: 20, fontWeight: 600, fontSize: 18 }}>
            Din bruker er ikke tilknyttet en organisasjon
          </div>
          <div>
            Ta kontakt med din administrator for å rett tilgang til ditt område.
          </div>
          <a
            style={{ cursor: "pointer" }}
            onClick={this.handleLogout.bind(this)}
          >
            Logg ut
          </a>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  noOrganisations: state.userReducer.noOrganisations,
  auth: state.userReducer.auth,
});

export default withRouter(connect(mapStateToProps)(Main));
