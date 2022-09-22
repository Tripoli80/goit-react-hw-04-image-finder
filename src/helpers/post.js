import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '28552926-42791f44734bdc6e191538ce6';

async function getHits({ qwery, page }) {
  const parameters = {
    key: API_KEY,
    q: qwery,
    page: page,
  };
  try {
    const hits = await axios.get(URL, {
      params: parameters,
    });
    return hits.data.hits;
  } catch (error) {
    console.error(error);
  }
}

export { getHits };
