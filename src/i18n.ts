// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en.json';
import hrTranslation from './locales/hr.json';

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    hr: { translation: hrTranslation },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Use English if the current language translations are missing
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;