// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import he from "./locales/he.json";


// Get language from localStorage if available
let initialLang = "en";
if (typeof window !== "undefined") {
  const storedLang = localStorage.getItem("lang");
  if (storedLang && ["en", "ar", "he"].includes(storedLang)) {
    initialLang = storedLang;
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    he: { translation: he },
  },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
