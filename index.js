import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Keycloak from 'keycloak-js'
import Root from './containers/Root'
import configureStore from './store/store'
import cfgreader from './config/readConfig'

// used by material-ui, will be removed once the official React version of MI is relased
import injectTapEventPlugin from 'react-tap-event-plugin'
import './styles/css/main.css'
injectTapEventPlugin()

// use authWithKeyCloak(renderIndex) for keycloak authentification
function authWithKeyCloak(renderCallback) {
  let keycloakAuth = new Keycloak('config/keycloak.json')

  keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
      renderCallback()
  })
}

cfgreader.readConfig( (function(config) {
  window.config = config
  renderIndex(config.endpointBase)
}).bind(this))

function renderIndex(path) {

  const store = configureStore()

  render(
    <Provider store={store}>
        <Root/>
      </Provider>,
    document.getElementById('root')
  )

}
