require('dotenv').config();

module.exports = {
    getKey: (key) => process.env[key]
};