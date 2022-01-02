import express from 'express';
import getRatingsForActor from '../data/imdb';
import { getAverageRatingForActor, getRecentAverageRatingForActor } from '../data/utils';

const router = express.Router();

router.get('/:actor', async (req, res) => {
  const ratings = await getRatingsForActor(req.params.actor);

  const averageRatingForActor = getAverageRatingForActor(ratings);
  const recentAverageRatingForActor = getRecentAverageRatingForActor(ratings);

  res.send({
    all: averageRatingForActor,
    recent: recentAverageRatingForActor,
  });
});

export default router;
