const router = require('express').Router();

// import package swagger 
const swaggerUi = require('swagger-ui-express');
// import file json
const swaggerDocument = require('../docs/swagger.json')

// API docs => dokumentasi API
router.use('/api-docs', swaggerUi.serve)
router.use('/api-docs', swaggerUi.setup(swaggerDocument))

const Admin = require('./admin')
const User = require('./users')
const Shop = require('./shops')
const Product = require('./product')

router.use('./api/v1/admin/', Admin)
router.use('/api/v1/users/', User);
router.use('/api/v1/shops/', Shop);
router.use('/api/v1/product/', Product);

// Dashboard

module.exports = router