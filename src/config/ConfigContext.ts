import React from "react";

interface Config {
  sentryDSN?: string;
  appEnv?: string;
}

export const ConfigContext = React.createContext<Config>({});
