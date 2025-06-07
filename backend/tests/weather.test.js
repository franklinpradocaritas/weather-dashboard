const request = require('supertest');
const app = require('../src/app');

describe('Weather API Endpoints', () => {
    test('GET /api/weather/current/:city returns data', async () => {
        const res = await request(app).get('/api/weather/current/London');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('main');
    });

    test('GET /api/weather/forecast/:city returns forecast', async () => {
        const res = await request(app).get('/api/weather/forecast/London');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('list');
    });

    test('POST /api/weather/favorites adds a city', async () => {
        const res = await request(app).post('/api/weather/favorites').send({ city_name: 'Paris', country_code: 'FR' });
        expect(res.statusCode).toBe(201);
        expect(res.body.city_name).toBe('Paris');
    });

    test('GET /api/weather/favorites returns list', async () => {
        const res = await request(app).get('/api/weather/favorites');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /api/weather/history returns search history', async () => {
        const res = await request(app).get('/api/weather/history');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});