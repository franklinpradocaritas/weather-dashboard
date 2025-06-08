const db = require('./db');

exports.saveHistory = async (city, data, userToken) => {
    const query = 'INSERT INTO weather_history(user_id, city_name, country_code, weather_data) VALUES($1, $2, $3, $4)';
    await db.query(query, [userToken, city, data.sys.country, data]);
};

exports.getHistory = async (user_id) => {
    const query = 'SELECT * FROM weather_history WHERE user_id = $1 ORDER BY searched_at DESC LIMIT 20';
    const { rows } = await db.query(query, [user_id]);
    return rows;
};

exports.clearHistory = async (user_id) => {
    const query = 'DELETE FROM weather_history WHERE user_id = $1 RETURNING *';
    const { rows } = await db.query(query, [user_id]);
    return rows[0];
};
