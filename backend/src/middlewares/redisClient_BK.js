const redis = require('redis');

// const redisClient = redis.createClient({
//   url: 'redis://<USUARIO>:<PASSWORD>@<HOST>:<PUERTO>'
//   // Ejemplo: 'redis://default:tu_contraseña@localhost:6379'
// });
console.log("-- LOG::REDIS_URL:", { REDIS_URL: process.env.REDIS_URL });

const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('error', (err) => {
    console.error('***Error en conexión a Redis:->', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Conectado exitosamente a Redis.');
    } catch (error) {
        console.error('Falló la conexión a Redis:', error);
    }
})();

module.exports = redisClient;
