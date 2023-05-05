const router = require('express').Router();
const productController = require('../controller/productController');

// import package swagger 
// const swaggerUi = require('swagger-ui-express');
// import file json
// const swaggerDocument = require('')

const Auth = require('../middleware/auth');
// // API docs => dokumentasi API
// router.use('/api-docs', swaggerUi.serve)
// router.use('/api-docs', swaggerUi.setup(swaggerDocument))


router.get('/', productController.getProducts)
router.get('/search', productController.searchProduct)
router.get('/:id', productController.getProductById)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)
router.post('/create',Auth, productController.createProduct)

module.exports = router