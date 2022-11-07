# Bel ![GitHub Workflow](https://github.com/entur/bel/actions/workflows/firebase-hosting-merge.yml/badge.svg?branch=master)

Operational status, provides the providers with relevant status of their data delivery

## Run the app

### Dev

```

npm install
npm start
```

### Production

```

npm install
npm run build
npm run prod
```

## Testing

```
  npm run test

```

## Configuration

We use convict.js for config. Set environment variables `PROVIDERS_BASE_URL`, `TIMETABLE_ADMIN_BASE_URL`
and `EVENTS_BASE_URL` in order to override default configuration of these
endpoints. E.g.

```
  PROVIDERS_BASE_URL=http://localhost:11601/services/providers/ EVENTS_BASE_URL=http://localhost:10001/services/events/ TIMETABLE_ADMIN_BASE_URL=http://localhost:11002/services/timetable_admin/ npm start dev
```

## Authentication

Uses Auth0 to authenticate user and read JWT for authorization.

**_NB_** Use `PORT=9000` for development since this is whitelisted.
