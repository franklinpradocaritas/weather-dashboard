const db = require('./db');

exports.addFavorite = async ({ user_id, city_name, country_code }) => {
    const now = new Date();
    const query = `
        INSERT INTO favorite_cities (user_id, city_name, country_code, added_at)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, city_name, country_code)
        DO UPDATE SET added_at = EXCLUDED.added_at
        RETURNING *;
    `;

    const { rows } = await db.query(query, [user_id, city_name, country_code, now]);
    return rows[0];
};

exports.getFavorites = async (user_id) => {
    const query = 'SELECT * FROM favorite_cities WHERE user_id = $1 ORDER BY added_at DESC';
    const { rows } = await db.query(query, [user_id]);
    return rows;
};

exports.deleteFavorite = async (id) => {
    const { rows } = await db.query('DELETE FROM favorite_cities WHERE id = $1 RETURNING *', [id]);
    return rows[0];
};