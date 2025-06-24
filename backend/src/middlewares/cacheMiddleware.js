
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL || 'redis://redis:6379');

module.exports = async (req, res, next) => {
    const queryParams = Object.entries(req.query).map(([key, value]) => `${key}/${value}`).join('/');

    const cacheKey = [`weather:${req.path}`, queryParams].join('/');

    try {
        const data = await new Promise((resolve, reject) => {
            redisClient.get(cacheKey, (err, reply) => err ? reject(err) : resolve(reply));
        });
        if (data) {
            return res.json(JSON.parse(data));
        }

        res.sendResponse = res.json;
        res.json = (body) => {
            redisClient.setex(cacheKey, 35, JSON.stringify(body), (err) => {
                if (err) console.error('Redis SETEX error', err);
            });
            res.sendResponse(body);
        };
    } catch (e) {
        console.error('Redis error', e);
    }
    next();
};
