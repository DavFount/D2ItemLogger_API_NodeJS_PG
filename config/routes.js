let router = require('express').Router();
const validateToken = require('../utils').validateToken;

router.get('/', (req, res) => {
    res.json({
        status: 'API It\'s Working',
        message: 'Welcome to D2BS Item Logger!'
    });
});

let userController = require('../controllers/users');
let itemController = require('../controllers/items');
router.route('/users')
    .get(validateToken, userController.list)
    .post(validateToken, userController.new);

router.route('/items')
    .get(validateToken, itemController.list)
    .post(validateToken, itemController.new);

router.route('/login')
    .post(userController.login);


module.exports = router;