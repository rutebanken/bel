const path = require("path");
const express = require("express");
const fallback = require("express-history-api-fallback");
const convictConfig = require("./src/config/convict.js");

const contentRoot = path.resolve(process.env.CONTENT_BASE || "./build");

const configureApp = async (app) => {
  const convict = await convictConfig;
  const endpointBase = convict.get("endpointBase");

  app.get(endpointBase + "_health", function (req, res) {
    res.sendStatus(200);
  });

  app.get(endpointBase + "config/keycloak.json", function (req, res) {
    res.send({
      realm: "rutebanken",
      "tokens-not-before": 1490857383,
      "public-client": true,
      "auth-server-url": convict.get("authServerUrl"),
      resource: "neti-frontend",
    });
  });

  app.get(endpointBase + "config.json", function (req, res) {
    var cfg = {
      providersBaseUrl: convict.get("providersBaseUrl"),
      eventsBaseUrl: convict.get("eventsBaseUrl"),
      endpointBase: convict.get("endpointBase"),
      timetableAdminBaseUrl: convict.get("timetableAdminBaseUrl"),
      chouetteBaseUrl: convict.get("chouetteBaseUrl"),
    };

    res.send(cfg);
  });

  app.get(endpointBase + "translations/en/actions.js", function (req, res) {
    res.sendFile(__dirname + "/src/translations/translations/en/actions.js");
  });

  app.use(endpointBase, express.static(contentRoot));

  app
    .use(endpointBase, fallback("index.html", { root: contentRoot }))
    .use((err, req, res, next) => {
      console.log(`Request to ${req.url} failed: ${err.stack}`);
      next(err);
    });

  app.use(endpointBase, (err, req, res, next) => {
    res.status(500);
    res.send({
      code: "INTERNAL_ERROR",
      message: "Ooops. Something broke back here. Sorry!",
    });
  });

  return app;
};

module.exports = { configureApp };
