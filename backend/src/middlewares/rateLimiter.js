const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
});
redisClient.on('error', err => console.error('Redis Error:', err));

const limiter = rateLimit({
    store: new RedisStore({
        client: redisClient,
        prefix: 'rl:',
    }),
    // windowMs: 15 * 60 * 1000,  // 15 minutos
    windowMs: 1 * 30 * 1000,  // 30 secs
    max: 50,                  // máximo 100 peticiones por IP
    // message: {
    //     status: 429,
    //     error: 'Too many requests, please try again later.'
    // },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip,
    handler: (req, res, next) => {
        // En lugar de res.status(429).send(...), lanzamos un error y delegamos
        const err = new Error('Too many requests, please try again later.');
        err.status = 429;
        next(err);
    },
});

module.exports = limiter;
