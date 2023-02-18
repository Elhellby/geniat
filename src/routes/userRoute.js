const router = require('express-promise-router')();

const {
    register
} = require('../controllers/usersController');

router.post('/register', register);

module.exports = router;