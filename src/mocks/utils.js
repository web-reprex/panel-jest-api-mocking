export const startBrowserBasedServerMocking = () => {
  if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_MOCKED) {
    const { worker } = require('./browser');
    worker.start();
  }
};
