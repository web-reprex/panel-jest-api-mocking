import { Button } from '@material-ui/core';
import {
  useThemeContext,
  useThemeContextSetState
} from 'src/store/contexts/theme/provider';
import { getNextTheme } from 'src/store/contexts/theme/utils';

export const ThemeToggler = () => {
  const theme = useThemeContext();
  const nextTheme = getNextTheme(theme);
  const setTheme = useThemeContextSetState();
  return (
    <Button color="secondary" variant="outlined" onClick={() => setTheme()}>
      Change theme to {nextTheme}
    </Button>
  );
};
