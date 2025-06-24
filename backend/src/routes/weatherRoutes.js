const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const auth = require('../middlewares/auth');
const cacheMiddleware = require('../middlewares/cacheMiddleware');


router.get('/current/:city', cacheMiddleware, weatherController.getCurrentWeather);
router.get('/forecast/:city', cacheMiddleware, weatherController.getForecast);

// router.get('/current/:city', weatherController.getCurrentWeather);
// router.get('/forecast/:city', weatherController.getForecast);


router.post('/favorites', auth, weatherController.addFavorite);
router.get('/favorites', auth, weatherController.getFavorites);
router.delete('/favorites/:id', auth, weatherController.removeFavorite);
router.get('/history', auth, weatherController.getHistory);
router.delete('/history', auth, weatherController.clearHistory);
router.get('/autocomplete', weatherController.getCitySuggestions);

module.exports = router;
