import { getLocales } from "expo-localization";

const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "8151a26f17888f9d09496420f570361d",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  language: getLocales()[0].languageCode,
};

export default apiConfig;
