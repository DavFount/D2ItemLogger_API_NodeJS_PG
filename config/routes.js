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
    .get(validateToken, userController.list) // Working
    .post(validateToken, userController.new); // Working

router.route('/users/:id')
    .get(validateToken, userController.show) // Working
    .patch(validateToken, userController.update); // Working

router.route('/items')
    .get(validateToken, itemController.list) // Working
    .post(validateToken, itemController.new); // Working

router.route('/items/:id')
    .get(validateToken, itemController.show); // Working

router.route('/login')
    .post(userController.login); // Working


module.exports = router;