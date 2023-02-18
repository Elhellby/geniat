const router = require('express-promise-router')();

const {
    login
} = require('../controllers/securityController');

router.post('/login', login);

module.exports = router;