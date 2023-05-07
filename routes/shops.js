const router = require('express').Router();
const shopController = require('../controller/shopController');

// // import package swagger 
// const swaggerUi = require('swagger-ui-express');
// // import file json
// const swaggerDocument = require('../docs/swagger.json')

const Auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// // API docs => dokumentasi API
// router.use('/api-docs', swaggerUi.serve)
// router.use('/api-docs', swaggerUi.setup(swaggerDocument))

router.get('/', shopController.getShops)
router.get('/:id',Auth, shopController.getShopById)
router.get('/search',Auth, shopController.searchShops)
router.put('/:id',Auth, shopController.editShop)
router.delete('/:id',Auth, shopController.deleteShop)
router.post('/',Auth, checkRole('admin'), shopController.createShop)

module.exports = router