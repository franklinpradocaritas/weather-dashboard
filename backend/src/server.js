// backend/src/server.js
const app = require('./app');

const PORT = process.env.PORT;
console.log(`Starting backend on port ${PORT}...`);

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
