const { product } = require('../models');
// const { default: axios } = require('axios');
const { Op } = require('sequelize');
// const imagekit = require('./lib/imagekit');
// const upload = require('./middleware/uploader');

async function getProduct (req, res){
    try{
        // melakukan check jika ada req.query.stock
        if (req.query.stock) {
            // parse req.query.stock yg awalnya string => number
            const requestStock = Number(req.query.stock)

            // check mau nya query apa, kurang dari atau kurang dari
            if (req.query.filter === 'kurang') {
                // proses ambil data product sesuai request query stock kurang dari
                const products = await product.findAll({
                    order: [['id', 'ASC']],
                    where: {
                        stock: {
                            [Op.lte]: requestStock
                        }
                    }
                });
                res.render("products/index", {
                    products
                })
            } else {
                // proses ambil data product sesuai request query stock dan lebih dari
                const products = await product.findAll({
                    order: [['id', 'ASC']],
                    where: {
                        stock: {
                            [Op.gt]: requestStock
                        }
                    }
                });
                res.render("products/index", {
                    products
                })
            }
        } else if (req.query.search) {
            const products = await product.findAll({
                order: [['id', 'DESC']],
                where: {
                    name: {
                        [Op.substring]: req.query.search
                    }
                }
            });
            res.render("products/index", {
                products
            })
        } else {
            const products = await product.findAll({
                order: [['stock', 'ASC']],
            });
            res.render("products/index", {
                products
            })
        }
    } catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function createProduct (req, res){
    res.render("products/create")
}

module.exports = {
    getProduct,
    createProduct
}