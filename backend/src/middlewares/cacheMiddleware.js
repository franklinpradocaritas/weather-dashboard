// const redis = require('redis');
// const client = redis.createClient({ url: process.env.REDIS_URL });

// client.connect();

// module.exports = async (req, res, next) => {
//     const key = `weather:${req.params.city}`;
//     const data = await client.get(key);
//     if (data) return res.json(JSON.parse(data));

//     res.sendResponse = res.json;
//     res.json = (body) => {
//         client.setEx(key, 3600, JSON.stringify(body));
//         res.sendResponse(body);
//     };

//     next();
// };

// =================================================

const { createClient } = require('redis');
const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
redisClient.connect().catch(console.error);

module.exports = async (req, res, next) => {
    const key = `weather:${req.params.city}`;
    try {
        const data = await redisClient.get(key);
        if (data) return res.json(JSON.parse(data));

        res.sendResponse = res.json;
        res.json = (body) => {
            redisClient.setEx(key, 3600, JSON.stringify(body));
            res.sendResponse(body);
        };
    } catch (e) {
        console.error('Redis error', e);
    }
    next();
};