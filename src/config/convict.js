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

var convict = require("convict");
var request = require("request");
var fs = require("fs");

module.exports = new Promise(function (resolve, reject) {
  var conf = convict({
    env: {
      doc: "The applicaton environment.",
      format: ["production", "development"],
      default: "development",
      env: "NODE_ENV",
    },
    configUrl: {
      doc: "URL for where to read the configuration",
      format: "*",
      default: "http://rutebanken.org/do_not_read",
      env: "CONFIG_URL",
    },
    providersBaseUrl: {
      doc: "Base URL for for Providers API including slash",
      format: "url",
      default: "https://api.dev.entur.io/timetable-admin/v1/providers/",
      env: "PROVIDERS_BASE_URL",
    },
    eventsBaseUrl: {
      doc: "Base URL for for Events API including slash",
      format: "url",
      default: "https://api.dev.entur.io/timetable-admin/v1/events/",
      env: "EVENTS_BASE_URL",
    },
    timetableAdminBaseUrl: {
      doc: "Base URL for for Timatable admin API including slash",
      format: "url",
      default: "https://api.dev.entur.io/timetable-admin/v1/timetable/",
      env: "TIMETABLE_ADMIN_BASE_URL",
    },
    endpointBase: {
      doc: "Namespace for client including slash, e.g. /admin/bel/",
      format: String,
      default: "/",
      env: "ENDPOINTBASE",
    },
    chouetteBaseUrl: {
      doc: "URL to Chouette UI",
      format: String,
      default: "https://rutedb-test.entur.org/",
      env: "CHOUETTE_BASE_URL",
    },
    udugBaseUrl: {
      doc: "URL for linking to NeTEx validation reports",
      format: String,
      default: "/netex-validation-reports/",
      env: "UDUG_BASE_URL",
    },
    udugMicroFrontendUrl: {
      doc: "URL to Udug micro frontend",
      format: String,
      default: "https://netex-validation-reports.dev.entur.org",
      env: "UDUG_MICRO_FRONTEND_URL",
    },
    ninsarBaseUrl: {
      doc: 'URL for linking to NeTEx validation reports',
      format: String,
      default: '/line-statistics/',
      env: 'NINSAR_BASE_URL'
    },
    ninsarMicroFrontendUrl: {
      doc: 'URL to Ninsar micro frontend',
      format: String,
      default: 'https://line-statistics.dev.entur.org',
      env: 'NINSAR_MICRO_FRONTEND_URL'
    },
    auth0Domain: {
      doc: "Auth0 domain",
      format: String,
      default: "ror-entur-dev.eu.auth0.com",
      env: "AUTH0_DOMAIN",
    },
    auth0ClientId: {
      doc: "Auth0 Client Id",
      format: String,
      default: "ZFz0whLRMzf8Qk3wjXesHbhtLrvd0zkD",
      env: "AUTH0_CLIENT_ID",
    },
    auth0Audience: {
      doc: "Auth0 Audience",
      format: String,
      default: "https://ror.api.dev.entur.io",
      env: "AUTH0_AUDIENCE",
    },
    auth0ClaimsNamespace: {
      doc: "Namespace for auth0 ID token custom roles claims",
      format: String,
      default: "https://ror.entur.io/role_assignments",
      env: "AUTH0_CLAIMS_NAMESPACE",
    },
  });

  // If configuration URL exists, read it and update the configuration object
  var configUrl = conf.get("configUrl");

  console.log("configUrl", configUrl);

  if (configUrl.indexOf("do_not_read") == -1) {
    // Read contents from configUrl if it is given

    if (configUrl.indexOf("http") == -1) {
      fs.readFile(configUrl, (error, data) => {
        if (!error) {
          data = JSON.parse(data);
          conf.load(data);
          conf.validate();
          resolve(conf);
        } else {
          reject("Could not load data from " + configUrl, error);
        }
      });
    } else {
      request(configUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(body);
          conf.load(body);
          conf.validate();
          resolve(conf);
        } else {
          reject("Could not load data from " + configUrl, error);
        }
      });
    }
  } else {
    console.log(
      "The CONFIG_URL element has not been set, so you use the default dev-mode configuration"
    );
    conf.validate();
    resolve(conf);
  }
});
