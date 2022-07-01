const express = require('express');
const mongodb = require('./mongodb');
const bodyparser = require('body-parser');
const {get_docuemts_by_category, get_document_by_name, get_shops_by_productID, get_shops_by_product_name} = require("./mongodb");
const cors = require('cors');
const sort_products = require('./utils');
const Seller = require('./seller.js');
const dataBaseManagement = require('./db/dataBaseManagement.js')

const app = express();
app.use(cors({origin: true, credentials: true}))
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(3000, function () {
    console.log('connected');
});


dataBaseManagement.connectToDB();
app.post('/api/seller/product', Seller.AddProduct);


app.post('/api/login', async function (req, res) {
    let result;
    await mongodb.check_user_exist('online-shop', 'users', req.body)
        .then(res => result = res)
        .catch(err => result = err);
    console.log(result);
    if (result.code === 200) {
        res.status(200).json({'message': 'ok'});
    } else {
        res.status(400).json({'message': 'error'});
    }
});
app.post('/api/register', async function (req, res) {
    const body = req.body;
    let result;
    await mongodb.check_user_exist('online-shop', 'users', body)
        .then(res => result = res)
        .catch(err => result = err);
    if (result.code === 404) {
        mongodb.insert('online-shop', 'users', body);
        res.status(200).json({'message': 'document inserted successfully'})
    }
});
app.get('/username/:user', async function (req, res) {
    const username = req.params.user;
    let result;
    await mongodb.check_username_exist('online-shop', 'users', username)
        .then(response => result = response).catch(error => result = error);
    if (result.code === 404) {
        res.status(200).json({'message': 'ok'})
    } else {
        res.status(404).json({'message': 'error'})
    }
});
app.get('/api/products', async function (req, res) {
    let products;
    await mongodb.all_products('online-shop', 'products')
        .then(response => products = response);
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({"products": products});
});
app.post('/api/products/insert', async function (req, res) {
    const product = req.body;
    mongodb.insert('online-shop', 'products', product);
    console.log('product inserted successfully');
});
app.get(/(Mobile|Tablet|Laptop)\/(Samsung|Xiaomi|Apple|Lenovo|Asus)/, async function (req, res) {
    const url = req.url.slice(1).split('/');
    const desired_url = {category: url[0], sub_category: url[1]}
    let results;
    await get_docuemts_by_category('online-shop', 'products', desired_url)
        .then(response => results = response);
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({'products': results});
});
app.post('/Filter/:price_filter', function (req, res) {
    const price_action = req.params['price_filter'];
    const body = req.body.products;
    const products = sort_products.sort_products(body, price_action);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
    res.status(200).json({products: products});
});
app.get('/api/product/:product_name', async function (req, res) {
    const {product_name} = req.params;
    let product;
    await get_document_by_name('online-shop', 'products', product_name)
        .then(response=>product=response);
    res.status(200).json({product:product});
});
app.get('/api/shops/:product_name',async function (req, res) {
    const {product_name} = req.params;
    let shops;
    await get_shops_by_product_name('online-shop','shop',product_name)
        .then(response=>shops=response);
    res.status(200).json({shops:shops});
});