# Bel

Operational status, provides the providers with relevant status of their data delivery

## Run the app

```
npm install
npm start
```

## Testing

Uses Nightwatch with Selenium for automated testing, cf. [documentation](http://nightwatchjs.org/)

```
  npm run smoke-test

```

Running the tests locally can be achived by (note: this required a running selenium-hub)
```
  nightwatch --env local

```

For testing async action creators (Redux-specific), we are using Mocha alongside with [Nock](https://github.com/node-nock/nock) for intercepting HTTP requests.
```
  npm test

```

## Configuration

We use convict.js for config. Set environment variables `MARDUK_BASE_URL`
and `NABU_BASE_URL` in order to override default configuration of these
endpoints. E.g.

```
  NABU_BASE_URL=http://localhost:10001/ MARDUK_BASE_URL=http://localhost:11002/ npm start dev
```

## Authentication

Uses Keycloak to authenticate user and read JWT for authorization, set `auth-server-url`:

```
AUTH_SERVER_URL=https://test.rutebanken.org/auth PORT=9000 NABU_BASE_URL=http://localhost:10001/ MARDUK_BASE_URL=http://localhost:11002/ npm start dev
 npm run dev
```

***NB*** Use `PORT=8000` or `PORT=9000` for development against `https://test.rutebanken.org/auth` since these are whitelisted.

