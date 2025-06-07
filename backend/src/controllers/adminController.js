const adminService = require('../services/adminService');

exports.addUser = async (req, res, next) => {
    try {
        const user = req.body;
        const result = await adminService.addUser(user.username);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

exports.getUserByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const data = await adminService.getUserByUsername(username);
        console.log('*****COntroller - User found:', data);

        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        console.log("==========================================");

        const userId = req.params.userId;
        console.log('*****Controller - Getting user by ID:', { userId });
        const data = await adminService.getUserById(userId);
        console.log('*****Controller - User found:', data);

        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.deleteUserByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const result = await adminService.deleteUserByUsername(username);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};
