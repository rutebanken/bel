import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './containers/Root';
import configureStore from './store/store';
import cfgreader from './config/readConfig';
import Keycloak from 'keycloak-js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/css/main.css';
injectTapEventPlugin();

cfgreader
  .readConfig(config => {
    window.config = config;
    authWithKeyCloak(config.endpointBase);
  });

const authWithKeyCloak = endpointBase => {
  let kc = new Keycloak(endpointBase + 'config/keycloak.json');
  kc
    .init({ onLoad: 'login-required', checkLoginIframe: false })
    .success(authenticated => {
      if (authenticated) {
        localStorage.setItem('BEL::jwt', kc.token);

        setInterval(() => {
          kc.updateToken(10).error(() => kc.logout());
          localStorage.setItem('BEL::jwt', kc.token);
        }, 10000);

        renderIndex(kc);
      } else {
        kc.login();
      }
    });
}

const renderIndex = kc =>{
  const store = configureStore(kc);

  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  );
}
