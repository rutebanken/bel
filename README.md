# Bel

Operational status, provides the providers with relevant status of their data delivery

## Run the app 

### Dev

```

npm install
npm run dev
```

### Production
```

npm install
npm run build
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

We use convict.js for config. Set environment variables `PROVIDERS_BASE_URL`, `TIMETABLE_ADMIN_BASE_URL`
and `EVENTS_BASE_URL` in order to override default configuration of these
endpoints. E.g.

```
  PROVIDERS_BASE_URL=http://localhost:11601/services/providers/ EVENTS_BASE_URL=http://localhost:10001/services/events/ TIMETABLE_ADMIN_BASE_URL=http://localhost:11002/services/timetable_admin/ npm start dev
```

## Authentication

Uses Keycloak to authenticate user and read JWT for authorization, set `auth-server-url`:

```
AUTH_SERVER_URL=https://test.rutebanken.org/auth PORT=9000 PROVIDERS_BASE_URL=http://localhost:11601/services/providers/  EVENTS_BASE_URL=http://localhost:10001/services/events/ TIMETABLE_ADMIN_BASE_URL=http://localhost:11002/services/timetable_admin/ npm start dev
 npm run dev
```

***NB*** Use `PORT=8000` or `PORT=9000` for development against `https://test.rutebanken.org/auth` since these are whitelisted.


