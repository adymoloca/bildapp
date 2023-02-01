// import I18n from 'i18n-js';
import i18n from 'i18n-js';
import { NativeModules, Platform } from 'react-native';
import en from './locales/en.json';
import ro from './locales/ro.json';

// const locale =
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale
//     : NativeModules.I18nManager.localeIdentifier;

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

// i18n.default = ro;
i18n.locale = deviceLanguage.substring(0, 2);
// I18n.locale = ro;

i18n.fallbacks = true;
i18n.translations = {
  ro,
  en,
};

export default i18n;
