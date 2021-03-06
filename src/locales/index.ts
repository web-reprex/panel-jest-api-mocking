import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { fa } from './fa';
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: { en, fa },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
export default i18n;
