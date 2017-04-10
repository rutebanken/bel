const rolesParser  = {}

rolesParser.getUserOrganisations = (tokenParsed, organisations) => {

  if (!tokenParsed || !tokenParsed.roles) return []

  let allowedOrganisations = []

  tokenParsed.roles.forEach( roleString => {
    let roleJSON = JSON.parse(roleString)
    if (roleJSON.r === 'editRouteData') {
      allowedOrganisations.push(roleJSON.o)
    }
  })

  let userOrganisations = []

  organisations.forEach( org => {
    if (org.sftpAccount && allowedOrganisations.indexOf(org.sftpAccount.toUpperCase()) > -1)
      userOrganisations.push(org)
  })

  return userOrganisations
}

export default rolesParser