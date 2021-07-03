import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import * as packageJson from '../package.json';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://efa3239deaff425fb364ebf8379393a0@sentry.phoenixdev.io/33',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    release: packageJson.version
  });
}
