import { it, describe } from 'mocha'
import { expect } from 'chai'
import organisations from './mock/organisations'
import tokenParsed from './mock/tokenParsed'
import rolesParser from '../roles/roleParser'

describe('test roleParser mapping functionality', () => {

  it('should return correct organisations based on roles', () => {

    let userOrganisations = rolesParser.getUserOrganisations(tokenParsed, organisations)
    expect(userOrganisations[0].id).to.equal(2)
    expect(userOrganisations.length).to.equal(1)
  })

})