/* global auth0 location */
const redirectAppUri = `${window.location.protocol}//${window.location.host}`;

const ENV = {
  prod: {
    auth0ClientId: 'J4ytJXWvA3vmSRfvSPd32w4gqg0w6GeI',
    auth0Domain: 'ljhooker.auth0.com',
    segmentIOWriteKey: 'IaHLWU6rQSOrYtoB71HvPwmGjiASKMos'
  },
  default: {
    auth0ClientId: '4Dqqc142VL3dqc81SQl75J9eYEs2EAe9',
    auth0Domain: 'agentauth.ljhooker.com',
    segmentIOWriteKey: 'LqAAsvEn0xx72YdH6s3XkjP9LESgixG7'
  }
};

function getEnvVars() {
  if (window.location.host.indexOf('agent.ljhooker.com') >= 0) {
    return ENV.prod;
  }
  return ENV.default;
}

function redirectBacktoApp() {
  console.log('auth: redirecting', redirectAppUri);
  window.location = redirectAppUri;
}
