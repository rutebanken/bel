const rolesParser  = {}

rolesParser.getUserOrganisations = (tokenParsed, organisations) => {

  if (!tokenParsed || !tokenParsed.roles) return []

  let allowedOrganisations = []
  let isAdmin = false

  tokenParsed.roles.forEach( roleString => {
    let roleJSON = JSON.parse(roleString)
    if (roleJSON.r === 'editRouteData') {
      allowedOrganisations.push(roleJSON.o.toUpperCase())
    } else if (roleJSON.r === 'adminEditRouteData') {
      isAdmin = true
    }
  })

  let userOrganisations = []

  if (isAdmin) return organisations

  organisations.forEach( org => {

    let referential = (org.chouetteInfo && org.chouetteInfo.referential)
      ? org.chouetteInfo.referential : org.sftpAccount

    if (org.sftpAccount && allowedOrganisations.indexOf(referential.toUpperCase()) > -1)
      userOrganisations.push(org)
  })

  return userOrganisations
}

export default rolesParser