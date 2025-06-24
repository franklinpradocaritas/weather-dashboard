const weatherService = require('../services/weatherService');

exports.getCurrentWeather = async (req, res, next) => {
    try {
        const userToken = req.headers[process.env.USER_TOKEN_HEADER];
        const units = req.query.units;
        console.log("--- CURRENT WEASTHER params:::", { units, userToken });
        const data = await weatherService.fetchCurrentWeather(req.params.city, userToken, units);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.getForecast = async (req, res, next) => {
    try {
        const units = req.query.units;
        const data = await weatherService.fetchForecast(req.params.city, units);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.addFavorite = async (req, res, next) => {
    try {
        const headerUserToken = req.headers[process.env.USER_TOKEN_HEADER];
        const userToken = req.userToken

        const user_id = userToken,
            city_name = req.body.city_name,
            country_code = req.body.country_code;

        const result = await weatherService.addFavoriteCity({ user_id, city_name, country_code });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

exports.getFavorites = async (req, res, next) => {
    try {

        const userToken = req.userToken
        // console.log("****** GETTING favorite cities", { userToken });
        const result = await weatherService.getFavoriteCities(userToken);
        // console.log("*******Fetched favorite cities:", userToken, result);

        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.removeFavorite = async (req, res, next) => {
    try {
        const result = await weatherService.removeFavoriteCity(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.getHistory = async (req, res, next) => {
    try {
        // return res.send('Hello world');
        const userToken = req.userToken;
        // console.log("BEFORE GET HISTORY", userToken);
        const result = await weatherService.getSearchHistory(userToken);
        // console.log("*** HISTORY RESULT::", { result });

        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.clearHistory = async (req, res, next) => {
    try {
        // return res.send('Hello world');
        const userToken = req.userToken;
        console.log("BEFORE DELETE HISTORY", userToken);
        const result = await weatherService.clearHistory(userToken);
        console.log("*** HISTORY DELETE RESULT::", { result });

        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.getCitySuggestions = async (req, res, next) => {
    try {
        const query = req.query.q;
        const limit = parseInt(req.query.limit) || 10;
        // console.log(`***Fetching suggestions for query: ${query} with limit: ${limit}`);

        if (!query) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }
        const suggestions = await weatherService.fetchCitySuggestions(query, limit);
        // console.log(`***Found ${suggestions.length} suggestions for query: ${query}`);

        res.json(suggestions);
    } catch (err) {
        next(err);
    }
};