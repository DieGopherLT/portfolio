'use client';

import { useState, useCallback, useEffect } from 'react';

type Language = 'en' | 'es';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export function useLanguageSwitch() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Initialize language from cookie after mount
  useEffect(() => {
    const cookieLang = getCookie('preferred-language') as Language;
    if (cookieLang && (cookieLang === 'en' || cookieLang === 'es')) {
      setCurrentLanguage(cookieLang);
    }
  }, []);

  const switchLanguage = useCallback((newLanguage: Language) => {
    setCookie('preferred-language', newLanguage);
    setCurrentLanguage(newLanguage);
    
    // Reload the page to apply the new language
    window.location.reload();
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    switchLanguage(newLanguage);
  }, [currentLanguage, switchLanguage]);

  return {
    currentLanguage,
    switchLanguage,
    toggleLanguage
  };
}
