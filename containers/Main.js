import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import TabsContainer from './TabsContainer'
import AsyncActions from '../actions/AsyncActions'

class Main extends React.Component {

  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
      this.props.dispatch(AsyncActions.getAllSuppliers())
    }).bind(this))
  }

  handleLogout() {
    const { kc } = this.props
    kc.logout()
  }

  render() {

    const { noOrganisations } = this.props

    if (!noOrganisations) {
      return (
        <div>
          <TabsContainer/>
        </div>
      )
    } else {
      return (
        <div>
          <div style={{marginTop: 20, fontWeight: 600, fontSize: 18}}>Din bruker er ikke tilknyttet en organisasjon</div>
          <div>Ta kontakt med din administrator for å rett tilgang til ditt område.</div>
          <a style={{cursor: 'pointer'}} onClick={this.handleLogout.bind(this)}>Logg ut</a>
        </div>)
    }

  }
}

const mapStateToProps = state => ({
  noOrganisations: state.userReducer.noOrganisations,
  kc: state.userReducer.kc
})

export default connect(mapStateToProps)(Main)
