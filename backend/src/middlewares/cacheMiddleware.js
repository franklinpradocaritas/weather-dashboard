
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL || 'redis://redis:6379');

redisClient.on('error', console.error);
redisClient.on('ready', () => console.log('Redis listo'));

module.exports = async (req, res, next) => {
    console.log("======= REDIS::", { path: req.path });

    // const key = `weather:${req.params.city}`;
    const key = `weather:${req.path}`;
    try {
        const data = await new Promise((resolve, reject) => {
            redisClient.get(key, (err, reply) => err ? reject(err) : resolve(reply));
        });
        if (data) {
            return res.json(JSON.parse(data));
        }

        res.sendResponse = res.json;
        res.json = (body) => {
            redisClient.setex(key, 35, JSON.stringify(body), (err) => {
                if (err) console.error('Redis SETEX error', err);
            });
            res.sendResponse(body);
        };
    } catch (e) {
        console.error('Redis error', e);
    }
    next();
};
