import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import langEN from "./assets/locales/en-translation.json";
import langTH from "./assets/locales/th-translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: "en",
    resources: {
      en: { translation: langEN },
      th: { translation: langTH },
    },
  });

export default i18n;
