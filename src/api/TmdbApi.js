import axiosClient from "./AxiosClient";

const tmdbApi = {
  getMoviesList: (params) => {
    const url = "movie/popular";
    return axiosClient.get(url, params);
  },

  getVideos: (id) => {
    const url = "movie/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (params) => {
    const url = "search/movie";
    return axiosClient.get(url, params);
  },
  detail: (id, params) => {
    const url = "movie/" + id;
    return axiosClient.get(url, params);
  },
  credits: (id) => {
    const url = "movie/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (id) => {
    const url = "movie/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
