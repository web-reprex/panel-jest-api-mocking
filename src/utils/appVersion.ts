import clog from './cuteLog';

const appVersion = {
  packageVersion: process.env.PACKAGE_VERSION || 0,
  packageName: process.env.PACKAGE_NAME || 0
};

const logAppInfo = () => {
  clog.folded(
    `APP '${appVersion.packageName}' %c v${appVersion.packageVersion}`
  )();
  clog.splitter();
};
export { logAppInfo, appVersion };
