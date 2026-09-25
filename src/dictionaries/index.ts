import { Dictionary } from './types';
import { en } from './locales/en';
import { fa } from './locales/fa';
import { ps } from './locales/ps';
import { ar } from './locales/ar';
import { ur } from './locales/ur';
import { tr } from './locales/tr';
import { de } from './locales/de';
import { fr } from './locales/fr';
import { es } from './locales/es';
import { it } from './locales/it';
import { pt } from './locales/pt';
import { ru } from './locales/ru';
import { zh } from './locales/zh';
import { ja } from './locales/ja';
import { ko } from './locales/ko';
import { hi } from './locales/hi';
import { id } from './locales/id';
import { nl } from './locales/nl';
import { uz } from './locales/uz';

export * from './types';

export const locales = [
  'en', 'fa', 'ps', 'ar', 'ur', 'tr', 'de', 'fr', 'es',
  'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'hi', 'id', 'nl', 'uz'
] as const;

export type SupportedLocale = typeof locales[number];
export const defaultLocale: SupportedLocale = 'en';

export interface LanguageInfo {
  code: SupportedLocale;
  name: string;
  native: string;
  flagUrl: string;
}

export const languages: LanguageInfo[] = [
  { code: 'en', name: 'English', native: 'English', flagUrl: '/flags/gb.svg' },
  { code: 'fa', name: 'Persian / Dari', native: 'فارسی / دری', flagUrl: '/flags/af.svg' },
  { code: 'ps', name: 'Pashto', native: 'پښتو', flagUrl: '/flags/af.svg' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flagUrl: '/flags/sa.svg' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flagUrl: '/flags/pk.svg' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flagUrl: '/flags/tr.svg' },
  { code: 'de', name: 'German', native: 'Deutsch', flagUrl: '/flags/de.svg' },
  { code: 'fr', name: 'French', native: 'Français', flagUrl: '/flags/fr.svg' },
  { code: 'es', name: 'Spanish', native: 'Español', flagUrl: '/flags/es.svg' },
  { code: 'it', name: 'Italian', native: 'Italiano', flagUrl: '/flags/it.svg' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flagUrl: '/flags/pt.svg' },
  { code: 'ru', name: 'Russian', native: 'Русский', flagUrl: '/flags/ru.svg' },
  { code: 'zh', name: 'Chinese', native: '简体中文', flagUrl: '/flags/cn.svg' },
  { code: 'ja', name: 'Japanese', native: '日本語', flagUrl: '/flags/jp.svg' },
  { code: 'ko', name: 'Korean', native: '한국어', flagUrl: '/flags/kr.svg' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flagUrl: '/flags/in.svg' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flagUrl: '/flags/id.svg' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flagUrl: '/flags/nl.svg' },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha', flagUrl: '/flags/uz.svg' },
];

export const rtlLocales: readonly SupportedLocale[] = ['fa', 'ps', 'ar', 'ur'] as const;

export const isRtlLocale = (locale: string): boolean => {
  return rtlLocales.includes(locale as SupportedLocale);
};

export const dictionaries: Record<SupportedLocale, Dictionary> = {
  en,
  fa,
  ps,
  ar,
  ur,
  tr,
  de,
  fr,
  es,
  it,
  pt,
  ru,
  zh,
  ja,
  ko,
  hi,
  id,
  nl,
  uz,
};

export const getDictionary = (locale: string): Dictionary => {
  if (locale in dictionaries) {
    return dictionaries[locale as SupportedLocale];
  }
  return dictionaries.en;
};
