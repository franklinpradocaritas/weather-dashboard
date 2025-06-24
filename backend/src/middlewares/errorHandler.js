module.exports = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};


module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    // Extraemos el código de estado de nuestro error, o usamos 500
    const status = err.status || err.statusCode || 500;

    // Logueo (opcional: puedes usar winston u otro logger)
    console.error(`[${new Date().toISOString()}]`, {
        message: err.message,
        status,
        stack: process.env.NODE_ENV === 'production' ? 'logstash' : err.stack,
    });

    // Respondemos en JSON
    res.status(status).json({
        error: err.message || 'Internal Server Error',
    });
};
