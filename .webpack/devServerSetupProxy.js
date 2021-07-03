const devServerSetupProxy = env => ({
  // port: 8080,
  proxy: [
    {
      context: ['/api', '/authentication-server', '/v1/kv'],
      target: 'https://' + env.REACT_APP_REGULAR_LOGIN,
      changeOrigin: true,
      logLevel: 'debug'
    }
    // {
    //   context: '/ws',
    //   target: `wss://${env.REACT_APP_DIRECT_CHAT}/ws`,
    //   ws: true,
    //   logLevel: 'debug'
    // }
  ]
});

module.exports = devServerSetupProxy;
