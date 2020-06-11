const apiKey = `66683917a94e703e14ca150023f4ea7c`;
const mockyApiKey = `ed4bd5c7-0971-4ce8-add9-8b68b1ce081c`;
const headers = { Accept: "application/json" };
let stage;

const get = async url => {
  try {
    const response = await fetch(url, { headers });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const init = stageInstance => {
  stage = stageInstance;
};

export const getMovies = () => get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);

export const getVodMenu = () => get(`https://run.mocky.io/v3/${mockyApiKey}`);

export const getImgUrl = (uri) => {
  return `https://image.tmdb.org/t/p/w220_and_h330_face${uri}`
};

