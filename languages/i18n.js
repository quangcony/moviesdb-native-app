import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./english.json";
import vietnamese from "./vietnamese.json";
import { getLocales } from "expo-localization";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    return callback(getLocales()[0].languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources: {
      en: english,
      vi: vietnamese,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
