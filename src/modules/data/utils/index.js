/**
 * Get the average rating for an actor ID
 *
 * @param {Array<number>} data All of the ratings for an actor
 * @returns {number} The average rating for a given actor
 */
function getAverageRatingForActor(data) {
  const average = data.reduce((acc, val) => acc + val, 0) / data.length;

  return average;
}

/**
 * Get the average recent rating for an actor ID
 *
 * @param {Array<number>} data All of the ratings for an actor
 * @returns {number} The average rating for a given actor
 */
function getRecentAverageRatingForActor(data) {
  const recentRatings = data.slice(0, 10);
  const average = recentRatings.reduce((acc, val) => acc + val, 0) / recentRatings.length;

  return average;
}

export { getAverageRatingForActor, getRecentAverageRatingForActor };
