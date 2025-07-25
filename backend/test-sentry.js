console.log('Test file is running');
const Sentry = require('@sentry/node');
const SentryExpress = require('@sentry/express');
console.log('SentryExpress.requestHandler:', typeof SentryExpress.requestHandler);
console.log('SentryExpress.errorHandler:', typeof SentryExpress.errorHandler); 