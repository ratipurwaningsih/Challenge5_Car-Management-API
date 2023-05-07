const { users, shops } = require('../models');
const { Op } = require("sequelize");
// import bcrypt untuk authentication
const bcrypt = require('bcrypt');
// import jwt sebagai autorization
const jwt = require('jsonwebtoken');
const { name } = require('ejs');

// untuk menampilkan semua user
async function getUsers(req, res) {
    try {
        const data = await users.findAll();

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

// mencari user by id
async function getUserById(req, res) {
    try{
        // Primary Key = Pk
        const id = req.params.id;
        const data = await users.findByPk(id,{
            include: {
                model: shops,
                attributes: ['name']
            }
        });
        
        // validasi jika id belum ada
        if(data){
            res.status(200).json({
                status: 'success',
                data
            })
        } else {
            res.status(404).json({
                status: 'failed',
                message : `id ${id} belum ada!`
            }) 
        }

    }catch(err){
        res.status(404).json({
            status: 'failed',
            message : err.message
        }) 
    }    
}

// mengedit username
async function editUser(req, res) {
    try {
        const {username} = req.body;
        const id = req.params.id;

    await users.update({
        username
    }, {
        where: {id}
    })

    if(username.length>3) {
        res.status(200).json({
            status: 'success',
            message: `data dari id ${id} nya berhasil berubah`
        })
    }else {
        res.status(400).json({
            status: 'failed',
            message : err.message
        })
    }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message : `nama tidak boleh kurang dari 3 huruf`
        })
    }
}

// Menghapus user
async function deleteUser(req, res) {
    try {
        const id = req.params.id
        await users.destroy({
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

// membuat user
async function createUser(req, res) {
    try {
        const {username, password} = req.body
        // proses enkripsi password
        const hashedPassword = bcrypt.hashSync(password, 10);

        const name = await users.findOne({
            where:{
                username
            }})

        const newUser = await users.create({
            username,
            // enkripsi di database
            password : hashedPassword,
            role: req.body.role
        })

        // Validasi uniq name
        if(!name){
            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser
                }
            })
        }else{
            res.status(400).json({
                status : 'failed',
                message : `nama ${username} sudah ada, coba nama lain`
            })
        } 
    }catch (err) {
        res.status(400).json({
            status: 'failed',
            message : err.message
        })
    }
}

// login
async function login(req, res) {
    try {
        const {username, password} = req.body

        // cari user berdasarkan username
        const user = await users.findOne({
            where: {
                username
            }
        })
        // validasi kalau usernya gak ada
        if (!user) {
            res.status(404).json({
                status: 'failed',
                message: `user ${username} gk ketemu`
            })
        }
        console.log(password)
        console.log(user.password)

        // check password dari request body sesuai gak sama hashed password dari database
        if(user && bcrypt.compareSync(password, user.password)) {
            
            // generate token utk user
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            }, 'rahasia')

            res.status(201).json({
                status: 'success',
                data : {
                    user,
                    token
                }
            })
        }

        } catch (err) {
            res.status(400).json({
                status: 'failed',
                message : err.message
            })
        }
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    editUser,
    createUser,
    login,
}