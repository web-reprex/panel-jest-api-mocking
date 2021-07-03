export const mockedRawConsul = {
  services: {
    iam: {
      hostname: 'iam-stage.phoenix.net',
      httpBasePath: '/authentication-server',
      options: {
        authorizePath: '/oauth/authorize',
        tokenPath: '/oauth/token'
      }
    }
  },
  configs: {
    initialized: false
  }
};
