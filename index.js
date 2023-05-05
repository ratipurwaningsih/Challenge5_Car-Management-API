// import atau panggil package yang kita mau pake di aplikasi kita
const express = require('express');
const { Op } = require("sequelize");
const path = require("path");
const {product} = require("./models");
const bodyParser = require('body-parser');
const routes = require('./routes');
const { default: axios } = require('axios');

// yang bantu upload file
const imagekit = require('./lib/imagekit')
const upload = require('./middleware/uploader')

// framework untuk http server
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// proses baca json



// setting view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// public 
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "controller")))



// url utama dari aplikasi
// req = request 
// res = response
// app.get('/', (req, res) => {
//     res.send('Hello FSW 3 yang luar biasa dari server nih !');
// })

app.get('/', (req, res) => {
    res.render("index", {
        name: 'Rati',
        status: 'tanda tanya',
        title: 'Hello FSW 3 yang luar biasa dari server nih !'
    })
})

app.get('/admin/products', async (req, res) => {
    try {

        // melakukan check jika ada req.query.stock
        if (req.query.stock) {
            // parse req.query.stock yang awalnya string => number
            const requestStock = Number(req.query.stock)
            // sheck maunya query apa, kurang dari atau lebih dari
            if (req.query.filter === 'kurang') {
                // proses ambil data product sesuai request query stock kurang dari
                const products = await product.findAll({
                    order: [['id', 'ASC']],
                    where: {
                        stock: {
                            [Op.lt]: requestStock
                        }
                    }
                });
                res.render("products/index", {
                    products
                })
            } else {
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
                order: [['id', 'ASC']],
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
            // proses get add product data
            const products = await product.findAll({
                // ini untuk order by id ascending (dari atas ke bawah) kalau descending (dari bawah ke atas)
                order: [['id', 'ASC']]
            });
            res.render("products/index", {
                products
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})

app.get('/admin/products/create', upload.single('image'), async (req, res) => {
    res.render("products/create")
})

app.post('/products/create', upload.single('image'), async (req, res) => {
    const {name, price, stock} = req.body
    const file = req.file
    // untuk dapat extension file
    // ImageBitmap.jpg => jpg itu extension nya
    const split = file.originalname.split('.');
    const ext = split[split.length - 1];

    // proses upload file ke imagekit
    const img = await imagekit.upload({
        file: file.buffer, // required
        fileName: `IMG-${Date.now()}.${ext}`,
    })

    await product.create({
        name,
        price,
        stock,
        imageUrl: img.url
    })
    res.redirect(200, "/admin/products")
})

app.get('/admin/products/edit/:id', async (req, res) => {
    const productDetail = await axios.get(`http://localhost:3000/api/products/${req.params.id}`)
    console.log(productDetail.data)
    res.render("products/edit", {
        title: "Edit",
        productDetail: productDetail.data
    })
})


app.post('/products/update/:id', async (req, res) => {
    const id = req.params.id
    const {name, price, stock} = req.body
    await product.update({
        name,
        price,
        stock
    }, {
        where: {
            id
        }
    })
    res.redirect(200, "/admin/products")
})

app.post('/products/delete/:id', async (req, res) => {
    const id = req.params.id
    await product.destroy({
        where: {
            id
        }
    })
    res.redirect(200, "/admin/products")
})

// app.post('/', (req, res) => {
//     res.send('Kita bisa ngelakuin Post di url ini');
// })

app.use(routes);

// memulai server nya
app.listen(PORT, () => {
    console.log(`App running on Localhost: ${PORT}`)
})