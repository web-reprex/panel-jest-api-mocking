import { css } from '@emotion/css';
import { Theme } from '@material-ui/core';

const loadingStyle = (theme: Theme) => css`
  label: loading;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${theme.palette.background.paper};
  z-index: ${theme.zIndex.modal};

  .logo {
    width: 100px;
  }
`;

export default loadingStyle;
