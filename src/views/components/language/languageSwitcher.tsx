import { Button } from '@material-ui/core';
import {
  useLocaleContext,
  useLocaleContextSetState
} from 'src/store/contexts/locale/provider';
import classes from './languageSwitcher.module.css';
export const LanguageSwitcher = () => {
  const locale = useLocaleContext();
  const setLocale = useLocaleContextSetState();

  return (
    <>
      <Button
        color="default"
        variant="text"
        className={classes.languageSwitcher}
        onClick={() => setLocale()}
      >
        Lang is {locale} --- Change Language
      </Button>
    </>
  );
};
