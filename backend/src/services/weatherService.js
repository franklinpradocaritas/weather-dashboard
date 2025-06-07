const axios = require('axios');
const db = require('../models/db');
const { saveHistory, getHistory } = require('../models/weatherHistory');
const { addFavorite, getFavorites, deleteFavorite } = require('../models/favoriteCities');
const { summarizeFiveDayForecast } = require('../utils/arrayUtils');
const apiKey = process.env.OPENWEATHER_API_KEY;

exports.fetchCurrentWeather = async (city) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    // const url = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${apiKey}&units=metric`;

    console.log("------- CURRENT WEATHER CITY:", { city, url });
    const res = await axios.get(url);
    console.log("------- CURRENT WEATHER RESPONSE:", res.data);
    // const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    await saveHistory(city, res.data);
    return res.data;
};

exports.fetchForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=0`;
    console.log("------- FORECAST CITY:", { city, url });

    const response = await axios.get(url);
    if (!response.data) {
        return [];
    }

    const { list: weathers = [] } = response.data;

    const filteredItems = summarizeFiveDayForecast(weathers);
    //   return summary;

    console.log("****** FORECAST:", { weathers, filteredItems });

    return filteredItems.map((weather) => ({
        main_temp: weather?.main?.temp,
        main_feels_like: weather?.main?.feels_like,
        weather_id: weather?.weather?.[0]?.id,
        weather_main: weather?.weather?.[0]?.main,
        weather_description: weather?.weather?.[0]?.description,
        weather_icon: weather?.weather?.[0]?.icon,
        sys_pod: weather?.sys?.pod,
        dt: weather?.dt,
        dt_txt: weather?.dt_txt,
    }));

    // return res.data;
};

exports.fetchCitySuggestions = async (query, limit = 10) => {
    if (!query || query.trim().length < 1) return [];
    const url = `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}&limit=10`;

    const response = await axios.get(url);

    if (!response.data) {
        return [];
    }

    const { list: cities = [] } = response.data;

    console.log("****** CITIES:", cities);

    return cities.map((city) => ({
        id: city.id,
        name: city.name,
        country: city?.sys?.country,
        lat: city?.coord?.lat,
        lon: city?.coord?.lon,
        city
    }));

};

exports.addFavoriteCity = addFavorite;
exports.getFavoriteCities = getFavorites;
exports.removeFavoriteCity = deleteFavorite;
exports.getSearchHistory = getHistory;