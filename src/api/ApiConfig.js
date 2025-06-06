const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "eae9cc176b3bed665d6cac958675a562",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};

export default apiConfig;
