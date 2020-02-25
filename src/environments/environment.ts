// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'https://ws-boletos.domiruth.com/api',
  url2: 'https://domiribbon.azurewebsites.net',
  url_br: 'https://domiribbon.azurewebsites.net',
  token_br: 'NmI0MjM3NDktNmZkYi00NGVmLWE0M2YtMGVkMDVhZTg5ZmI2',
  url_visa: 'https://domiribbon.azurewebsites.net',
  visa_timeouturl: 'http://localhost:4200/visa-fin',
  visa_pagook: 'http://localhost:4200/visa-timeout',
  url_sms: 'https://localhost:4200/pass-ticket',
  url_visa_auth: 'https://domiribbon.azurewebsites.net/visa/AutorizarTransaccionBRB'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
