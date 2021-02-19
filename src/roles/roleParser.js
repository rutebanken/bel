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

const rolesParser = {};

rolesParser.getUserOrganisations = (roleAssignments, organisations) => {
  if (!roleAssignments) return [];

  let allowedOrganisations = [];
  let isAdmin = false;

  roleAssignments.forEach((roleString) => {
    let roleJSON = JSON.parse(roleString);
    if (roleJSON.r === "editRouteData") {
      allowedOrganisations.push(roleJSON.o.toUpperCase());
    } else if (roleJSON.r === "adminEditRouteData") {
      isAdmin = true;
    }
  });

  let userOrganisations = [];

  if (isAdmin) return organisations;

  organisations.forEach((org) => {
    let referential =
      org.chouetteInfo && org.chouetteInfo.referential
        ? org.chouetteInfo.referential
        : org.sftpAccount;

    if (
      org.sftpAccount &&
      allowedOrganisations.indexOf(referential.toUpperCase()) > -1
    )
      userOrganisations.push(org);
  });

  return userOrganisations;
};

export default rolesParser;
