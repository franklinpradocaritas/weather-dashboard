const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const weatherRoutes = require('./routes/weatherRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use('/api/weather', rateLimiter);

app.use('/api/weather', weatherRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res, next) => {
    const err = new Error('Resource Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

module.exports = app;