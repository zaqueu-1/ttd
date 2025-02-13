import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslations from "./translations/en.json"
import ptTranslations from "./translations/pt.json"

i18n.use(initReactI18next).init({
  resources: {
    en: enTranslations,
    pt: ptTranslations,
  },
  lng: localStorage.getItem("language") || "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
