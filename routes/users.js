const router = require('express').Router();
const userController = require('../controller/userController');

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)
router.post('/register', userController.createUser)
router.post('/login', userController.login)

module.exports = router