import { css } from '@emotion/css';
import { Theme } from '@material-ui/core';

const initStyle = (theme: Theme) => css`
  label: init;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.palette.background.paper};

  .logo {
    width: 85px;
    margin-bottom: ${theme.spacing(2)}px;
  }

  .init {
    width: 100%;
    max-width: 600px;
    padding: ${theme.spacing(2)}px;
  }

  .initRow {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: ${theme.spacing(2)}px;
    :last-child {
      margin-bottom: 0;
    }
  }
`;

export default initStyle;
