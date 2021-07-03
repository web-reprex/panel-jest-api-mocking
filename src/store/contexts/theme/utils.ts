export enum Themes {
  light = 'light',
  dark = 'dark'
}
export const saveTheme = (theme: Themes) =>
  localStorage.setItem('theme', theme);

export const findTheme = () =>
  (localStorage.getItem('theme') as Themes) || Themes.light;

export const getNextTheme = (theme: Themes) =>
  theme === Themes.light ? Themes.dark : Themes.light;

export const setThemeAttribute = (theme: Themes) =>
  document.documentElement.setAttribute('theme', theme);
