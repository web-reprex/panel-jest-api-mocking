export enum Locales {
  en = 'enUS',
  fa = 'faIR'
}

export const isRtl = (locale: Locales) => [Locales.fa].includes(locale);

export const nextLocaleDirection = (locale: Locales) =>
  isRtl(locale) ? 'rtl' : 'ltr';

export const saveLocale = (locale: Locales) =>
  localStorage.setItem('locale', locale);

export const findLocale = () =>
  (localStorage.getItem('locale') as Locales) || Locales.en;

export const nextLocale = (locale: Locales) =>
  locale === Locales.fa ? Locales.en : Locales.fa;

export const setLocaleAttribute = (locale: Locales) =>
  document.documentElement.setAttribute('locale', locale);

export const setDirAttribute = (locale: Locales) =>
  document.body.setAttribute('dir', nextLocaleDirection(locale));
