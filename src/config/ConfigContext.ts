import React from "react";

interface Config {
  sentryDSN?: string;
  appEnv?: string;
  providersBaseUrl?: string;
  auth0Domain?: string;
  auth0ClientId?: string;
  auth0Audience?: string;
  udugMicroFrontendUrl?: string;
  ninsarMicroFrontendUrl?: string;
  zagmukMicroFrontendUrl?: string;
}

export const ConfigContext = React.createContext<Config>({});
