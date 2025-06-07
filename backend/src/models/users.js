const db = require('./db');

exports.addUser = async (username) => {
    const query = 'INSERT INTO users(username) VALUES($1) RETURNING *';
    const { rows } = await db.query(query, [username]);
    return rows[0];
};

exports.getUserByUsername = async (username) => {
    try {
        console.log('*****SELECTING USER BY USERNAME:', username);

        const query = 'SELECT * FROM users WHERE username= $1';
        const { rows } = await db.query(query, [username]);
        console.log('*****USER FOUND:', rows);

        return rows[0];
    } catch (err) {
        console.error('Error finding username:', err);
        throw err;
    }
};

exports.getUserById = async (userId) => {
    try {
        console.log('*****SELECTING USER BY ID:', userId);

        const query = 'SELECT * FROM users WHERE id= $1';
        const { rows } = await db.query(query, [userId]);
        console.log('*****USER FOUND:', rows);

        return rows[0];
    } catch (err) {
        console.error('Error finding ID:', err);
        throw err;
    }
};

exports.deleteUserByUsername = async (username) => {
    const { rows } = await db.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);
    return rows[0];
};