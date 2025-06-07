const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const auth = require('../middlewares/auth');
// const cacheMiddleware = require('../middlewares/cacheMiddleware');


// router.get('/current/:city', cacheMiddleware, weatherController.getCurrentWeather);
// router.get('/forecast/:city', cacheMiddleware, weatherController.getForecast);
router.get('/current/:city', weatherController.getCurrentWeather);
router.get('/forecast/:city', weatherController.getForecast);
router.post('/favorites', auth, weatherController.addFavorite);
// router.post('/favorites', weatherController.addFavorite);
router.get('/favorites', auth, weatherController.getFavorites);
router.delete('/favorites/:id', weatherController.removeFavorite);
router.get('/history', weatherController.getHistory);
router.get('/autocomplete', weatherController.getCitySuggestions);

module.exports = router;
