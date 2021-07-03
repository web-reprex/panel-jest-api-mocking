import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { muiTheme } from './theme';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  getNextTheme,
  findTheme,
  saveTheme,
  setThemeAttribute,
  Themes
} from './utils';

export const ThemeContext = createContext<Themes | undefined>(undefined);
export const ThemeContextSetState = createContext<CallableFunction | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState(findTheme());
  const nextTheme = getNextTheme(theme);
  const changeThemeHandler = () => {
    setTheme(nextTheme);
    saveTheme(nextTheme);
  };

  useEffect(() => setThemeAttribute(theme), [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeContextSetState.Provider value={changeThemeHandler}>
        <MuiThemeProvider theme={muiTheme(theme)}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ThemeContextSetState.Provider>
    </ThemeContext.Provider>
  );
};
export function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (theme === undefined)
    throw new Error('useThemeContext is not wrapped by <ThemeProvider>');
  return theme;
}
export function useThemeContextSetState() {
  const setTheme = useContext(ThemeContextSetState);
  if (setTheme === undefined)
    throw new Error(
      'useThemeContextSetState is not wrapped by <ThemeProvider>'
    );
  return setTheme;
}
