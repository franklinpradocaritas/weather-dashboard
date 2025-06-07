// const rateLimit = require('express-rate-limit');
// const RedisStore = require('rate-limit-redis');
// const redis = require('redis');

// const client = redis.createClient({ url: process.env.REDIS_URL });

// const limiter = rateLimit({
//     store: new RedisStore({ sendCommand: (...args) => client.sendCommand(args) }),
//     windowMs: 60 * 1000,
//     max: 60,
//     message: 'Too many requests, please try again later.'
// });

// module.exports = limiter;

//============================================

// const rateLimit = require('express-rate-limit');
// const RedisStore = require('rate-limit-redis');
// const redis = require('redis');

// const client = redis.createClient({
//     url: 'redis://redis:6379' // ← aquí usamos el nombre del servicio definido en docker-compose
// });

// client.connect();

// const limiter = rateLimit({
//     store: new RedisStore({ sendCommand: (...args) => client.sendCommand(args) }),
//     windowMs: 60 * 1000,
//     max: 60,
//     message: 'Too many requests, please try again later.'
// });

// module.exports = limiter;

// =============================================

// const rateLimit = require('express-rate-limit');
// const RedisStore = require('rate-limit-redis');
// const { createClient } = require('redis');

// const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
// redisClient.connect().catch(console.error);

// const limiter = rateLimit({
//     store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) }),
//     windowMs: 60 * 1000,
//     max: 60,
//     message: 'Too many requests, please try again later.'
// });

// module.exports = limiter;

// // =============================================

// const rateLimit = require('express-rate-limit');
// const RedisStore = require('rate-limit-redis');
// const redis = require('redis');

// // const redisClient = redis.createClient({
// //     socket: {
// //         host: process.env.REDIS_HOST || 'redis',
// //         port: 6379
// //     }
// // });
// //============================================================
// // const redisClient = redis.createClient({
// //     socket: {
// //         host: process.env.REDIS_HOST || 'redis',
// //         port: process.env.REDIS_PORT || 6379
// //     },
// //     password: process.env.REDIS_PASSWORD || undefined
// // });
// //============================================================
// const redisClient = redis.createClient(
//     // {
//     //     url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`
//     // }
//     // { url: process.env.REDIS_URL }
//     process.env.REDIS_URL
// );

// await redisClient.connect();

// // redisClient.connect().catch((err) => console.error('Redis connection failed', err));
// redisClient.on('error', (err) => {
//     console.error('Redis error:', err);
// });

// // --->> redisClient.connect();

// // redisClient.connect()
// //     .then(() => console.log('Redis connected::'))
// //     .catch((err) => console.error('Redis failed to connect::', err));


// const limiter = rateLimit({
//     windowMs: 60 * 1000,
//     max: 60,
//     store: new RedisStore({
//         sendCommand: (...args) => redisClient.sendCommand(args)
//     }),
//     message: 'Too many requests, please try again later.'
// });

// module.exports = limiter;

//*************************************

// =============================================

const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
// const redis = require('redis');
const redisClient = require('./redisClient');


// // Definimos las opciones de rate limiting
// const rateLimiter = rateLimit({
//   store: new RedisStore({
//     client: redisClient,
//     prefix: 'rl:',            // prefijo para las keys en Redis
//     // ttl: 60 * 60,          // opcional: tiempo de vida (en segundos) de cada key en Redis
//   }),
//   windowMs: 15 * 60 * 1000,   // 15 minutos
//   max: 100,                   // Máximo 100 peticiones por IP en el window
//   standardHeaders: true,      // Devuelve información en los headers `RateLimit-*`
//   legacyHeaders: false,       // Deshabilita los headers `X-RateLimit-*`
//   message: {
//     status: 429,
//     error: 'Too many requests',
//     message: 'Has excedido el límite de peticiones. Intenta nuevamente más tarde.'
//   }
// });

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    // store: new RedisStore({
    //     sendCommand: (...args) => redisClient.sendCommand(args)
    // }),
    store: new RedisStore({
        client: redisClient,
        prefix: 'rl:',            // prefijo para las keys en Redis
        // ttl: 60 * 60,          // opcional: tiempo de vida (en segundos) de cada key en Redis
    }),
    message: 'Too many requests, please try again later.'
});

module.exports = limiter;