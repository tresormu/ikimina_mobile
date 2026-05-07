import { useState, useCallback } from 'react';
import { translations, Language } from '../i18n/translations';

// Simple global state for demo purposes
// In a real app, use a Context or Redux
let currentLanguage: Language = 'en';
const listeners: Set<(lang: Language) => void> = new Set();

export const useTranslation = () => {
  const [lang, setLang] = useState<Language>(currentLanguage);

  const t = useCallback((key: keyof typeof translations.en): string => {
    const value = translations[lang][key] || key;
    return String(value);
  }, [lang]);

  const changeLanguage = useCallback((newLang: Language) => {
    currentLanguage = newLang;
    setLang(newLang);
    listeners.forEach(l => l(newLang));
  }, []);

  return { t, lang, changeLanguage };
};
