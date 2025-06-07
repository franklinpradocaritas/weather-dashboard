module.exports = (req, res, next) => {
    // const userToken = req.headers['x-user-token'];
    const userToken = req.headers[process.env.USER_TOKEN_HEADER];
    console.log("*******Auth Middleware - User token:", userToken, { HEADER: process.env.USER_TOKEN_HEADER });

    if (!userToken) {
        return res.status(401).json({ error: 'Missing Token Header. User not authenticated' });
    }
    req.userToken = userToken;
    next();
};