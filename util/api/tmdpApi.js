import axiosClient from "./axiosClient";

export const category = {
  all: "all",
  movie: "movie",
  tv: "tv",
  person: "person",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
  now_playing: "now_playing",
};

export const movieTitle = [
  { name: "upcoming", title: "upcoming movies" },
  { name: "popular", title: "popular movies" },
  { name: "top_rated", title: "top rated movies" },
  { name: "now_playing", title: "now playing movies" },
];

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

export const tvTitle = [
  { name: "on_the_air", title: "on the air tv" },
  { name: "popular", title: "popular tv" },
  { name: "top_rated", title: "top rated tv" },
];

export const personType = {
  popular: "popular",
};

const tmdpApi = {
  getMovieList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },

  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },

  getPeople: (type, params) => {
    const url = "person/" + personType[type];
    return axiosClient.get(url, params);
  },

  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },

  // Get the movie and TV credits together in a single response
  getCombinedCredits: (cate, id) => {
    const url = category[cate] + "/" + id + "/combined_credits";
    return axiosClient.get(url, { params: {} });
  },

  getLanguages: () => {
    const url = "configuration/languages";
    return axiosClient.get(url, { params: {} });
  },

  search: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },

  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },

  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },

  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
  trending: (cate, time) => {
    const url = "trending/" + category[cate] + "/" + time;
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdpApi;
