const db = require('./db');

exports.saveHistory = async (city, data) => {
    const query = 'INSERT INTO weather_history(city_name, country_code, weather_data) VALUES($1, $2, $3)';
    await db.query(query, [city, data.sys.country, data]);
};

exports.getHistory = async () => {
    const { rows } = await db.query('SELECT * FROM weather_history ORDER BY searched_at DESC LIMIT 50');
    return rows;
};