import { createMuiTheme } from '@material-ui/core/styles';
import { Themes } from './utils';
import iranyekanWebLight from 'src/assets/styles/fonts/iranyekan/iranyekanweblightfanum.woff';
import iranyekanWebRegular from 'src/assets/styles/fonts/iranyekan/iranyekanwebregularfanum.woff';
import iranyekanWebBold from 'src/assets/styles/fonts/iranyekan/iranyekanwebboldfanum.woff';

const fontLight = {
  fontFamily: 'iranyekan',
  fontStyle: 'normal',
  fontWeight: 300,
  src: `url(${iranyekanWebLight}) format('woff')`
};
const fontRegular = {
  fontFamily: 'iranyekan',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: `url(${iranyekanWebRegular}) format('woff')`
};
const fontBold = {
  fontFamily: 'iranyekan',
  fontStyle: 'normal',
  fontWeight: 'bold',
  src: `url(${iranyekanWebBold}) format('woff')`
};

export const muiTheme = (theme: Themes) =>
  createMuiTheme({
    typography: {
      fontFamily: 'iranyekan'
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [fontLight, fontRegular, fontBold]
        }
      }
    },
    palette: { type: theme ?? 'light' }
  });
