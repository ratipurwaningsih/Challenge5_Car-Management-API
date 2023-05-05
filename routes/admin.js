const router = require('express').Router();

const admin = require('../controller/adminController');
// const Auth = require('../middleware/auth');

router.get('/', admin.getProduct);
router.get('/create', admin.createProduct);

module.exports = router