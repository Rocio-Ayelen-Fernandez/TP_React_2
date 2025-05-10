import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa tus traducciones
import translationEN from "./locals/en/translation.json";
import translationES from "./locals/es/translation.json";

// Trae el idioma del localStorage
const savedLang = localStorage.getItem("language");
// Detecta idioma del navegador
const userLang = navigator.language || navigator.userLanguage;
const initialLang = savedLang || (userLang.startsWith("es") ? "es" : "en");

// Definí las traducciones
const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
};



i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang, // idioma inicial dinámico
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;