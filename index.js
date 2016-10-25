import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Keycloak from 'keycloak-js'
import App from './containers/App'
import configureStore from './store/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// used by material-ui, will be removed once the official React version of MI is relased
import injectTapEventPlugin from 'react-tap-event-plugin'
import './styles/css/main.css'

renderIndex()
/* use authWithKeyCloak(renderIndex) for keycloak authentification */
function authWithKeyCloak(renderCallback) {
  let keycloakAuth = new Keycloak('config/keycloak.json')

  keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
      renderCallback()
  })
}

function renderIndex() {

  const store = configureStore()
  injectTapEventPlugin()

  render(
    <Provider store={store}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
      </Provider>,
    document.getElementById('root')
  )

}
