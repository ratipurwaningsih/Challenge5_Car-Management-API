const { shops } = require('../models');
const { Op } = require("sequelize");

async function getShops(req, res) {
    try {
        const data = await shops.findAll();

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function searchShops(req, res) {
    try {
        const data = await shops.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.name
                }
            }
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function getShopById(req, res) {
    try{
        // Primary Key = Pk
        const id = req.params.id;
        const data = await shops.findByPk(id);

        res.status(200).json({
            status: 'success',
            data
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message : err.message
        }) 
    }    
}

async function editShop(req, res) {
    try {
        const {name} = req.body;
        const id = req.params.id;

    await shops.update({
        name
    }, {
        where: {id}
    })
    res.status(200).json({
        status: 'success',
        message: `data dari id ${id} nya berhasil berubah`
    })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message : err.message
        })
    }
}

async function deleteShop(req, res) {
    try {
        const id = req.params.id
        await shops.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            'status': 'success',
            'message': `data ${id} ini berhasil di hapus`
        })
    } catch (err) {
        res.status(400).message(err.message)
    }
}

async function createShop(req, res) {
    try {
        console.log('ini user dari JWT')
        console.log(req.user)
        
        const {name, city } = req.body
        const newShop = await shops.create({
            name,
            city,
            userId : req.user.id,
        })
        res.status(201).json({
            status: 'success',
            data : {
                shop: newShop
            }
        })
    
        } catch (err) {
            res.status(400).json({
                status: 'failed',
                message : err.message
            })
        }
}

module.exports = {
    getShops,
    getShopById,
    searchShops,
    deleteShop,
    editShop,
    createShop,
}