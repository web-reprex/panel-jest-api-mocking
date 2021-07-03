enum ColorStatus {
  info = '#40a7e3',
  ServerInfo = '#3e618a',
  warning = '#f28021',
  danger = '#b41e4a',
  dark = '#222222'
}
export const doNothing = (_: any) => _;

const clog = (
  text: string,
  status: keyof typeof ColorStatus = 'dark',
  ...args: any
) =>
  process.env.REACT_APP_DISABLE_LOGGER
    ? doNothing
    : console.log.bind(
        console,
        `%c ${text}`,
        `font-weight:bold; color: ${ColorStatus[status]}`,
        args.length === 0
          ? ''
          : args.length === 1
          ? typeof args[0] == 'string'
            ? args[0].length > 100
              ? args
              : args[0]
            : args[0]
          : args //...args
      );

clog.splitter = process.env.REACT_APP_DISABLE_LOGGER
  ? doNothing
  : console.log.bind(
      console,
      `%c ${'-'.repeat(30)} `,
      `background: #bbbbbb36;`
    );

clog.folded = (text: string) =>
  process.env.REACT_APP_DISABLE_LOGGER
    ? doNothing
    : console.log.bind(
        console,
        `%c ${text} %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      );

export default clog;
