let router = require('express').Router();
const validateToken = require('../utils').validateToken;

router.get('/', (req, res) => {
    res.json({
        status: 'API It\'s Working',
        message: 'Welcome to D2BS Item Logger!'
    });
});

var userController = require('../controllers/users');
router.route('/users')
    .get(validateToken, userController.list)
    .post(validateToken, userController.new);

router.route('/login')
    .post(userController.login);


module.exports = router;