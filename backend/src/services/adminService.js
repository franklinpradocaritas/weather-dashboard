const axios = require('axios');
const db = require('../models/db');
const { addUser, getUserByUsername, deleteUserByUsername, getUserById } = require('../models/users');

exports.addUser = addUser;
exports.getUserByUsername = getUserByUsername;
exports.getUserById = getUserById;
exports.deleteUserByUsername = deleteUserByUsername;