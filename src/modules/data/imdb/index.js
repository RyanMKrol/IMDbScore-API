import curl from 'curl';
import cheerio from 'cheerio';

/**
 * Fetches the links for everything an actor has acted in
 *
 * @param {string} actorId The actor to fetch links for
 * @returns {Array<string>} The links
 */
async function getActorFilmographyLinks(actorId) {
  const url = `https://www.imdb.com/name/${actorId}`;
  return new Promise((resolve, reject) => {
    curl.get(url, (error, response, body) => {
      try {
        const $ = cheerio.load(body);
        const links = $('#filmo-head-actor + .filmo-category-section .filmo-row b a')
          .map((_, element) => $(element).attr('href'))
          .get();
        resolve(links);
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Fetches the rating for a tv or movie link
 *
 * @param {string} titleLink The link to a tv show or movie
 * @returns {number} The rating for a given link
 */
async function getRatingForTitle(titleLink) {
  return new Promise((resolve, reject) => {
    curl.get(`https://www.imdb.com${titleLink}`, (error, response, body) => {
      try {
        const $ = cheerio.load(body);
        const ratings = $(
          'div[data-testid="hero-rating-bar__aggregate-rating__score"] span:first-child',
        )
          .map((_, element) => $(element).text())
          .get();
        resolve(ratings[0]);
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Get all ratings for an actor ID
 *
 * @param {string} actorId An ID for an IMDb actor
 * @returns {number} The ratings for a given actor
 */
async function getRatingsForActor(actorId) {
  const links = await getActorFilmographyLinks(actorId);
  return (await Promise.all(links.map((link) => getRatingForTitle(link))))
    .filter((x) => x)
    .map(parseFloat);
}

export default getRatingsForActor;
