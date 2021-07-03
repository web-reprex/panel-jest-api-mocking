import { createContext, useContext, useEffect, useState } from 'react';
import * as locales from '@material-ui/core/locale';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/locales';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  StylesProvider,
  jssPreset,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import {
  findLocale,
  Locales,
  nextLocale,
  nextLocaleDirection,
  saveLocale,
  setDirAttribute,
  setLocaleAttribute
} from 'src/locales/utils';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL({ children }: { children: JSX.Element }) {
  return <StylesProvider jss={jss}>{children}</StylesProvider>;
}
export const LocaleContext = createContext<string | undefined>(undefined);
export const LocaleContextSetState = createContext<
  CallableFunction | undefined
>(undefined);

const muiLanguage = (locale: Locales) => (outerTheme: any) =>
  createMuiTheme(
    { ...outerTheme, direction: nextLocaleDirection(locale) },
    locales[locale]
  );

export const LocaleProvider = ({ children }: { children: JSX.Element }) => {
  const [locale, setLocale] = useState<Locales>(findLocale());
  const nextLanguage = nextLocale(locale).substr(0, 2);

  const changeLocaleHandler = () => {
    setLocale(nextLocale(locale));
    saveLocale(nextLocale(locale));
    i18n.changeLanguage(nextLanguage).catch(console.log);
  };

  useEffect(() => {
    setLocaleAttribute(locale);
    setDirAttribute(locale);
  }, [locale]);

  useEffect(() => {
    // Load language
    i18n.changeLanguage(locale.substr(0, 2)).catch(console.log);
  }, []);

  return (
    <LocaleContext.Provider value={locale}>
      <LocaleContextSetState.Provider value={changeLocaleHandler}>
        <RTL>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={muiLanguage(locale)}>
              {children}
            </ThemeProvider>
          </I18nextProvider>
        </RTL>
      </LocaleContextSetState.Provider>
    </LocaleContext.Provider>
  );
};

export function useLocaleContext() {
  const locale = useContext(LocaleContext);
  if (locale === undefined)
    throw new Error('useLocaleContext is not wrapped by <LocaleProvider>');
  return locale;
}
export function useLocaleContextSetState() {
  const setLocale = useContext(LocaleContextSetState);
  if (setLocale === undefined)
    throw new Error(
      'useLocaleContextSetState is not wrapped by <LocaleProvider>'
    );
  return setLocale;
}
