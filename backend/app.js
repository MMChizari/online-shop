const express = require('express');
const mongodb = require('./mongodb');
const bodyparser = require('body-parser');
const {
    get_docuemts_by_category, get_document_by_name, get_shops_by_productID, get_shops_by_product_name,
    get_favorite_base_username, update_product, get_report, update_report, insertDocument, get_seller_by_name,
    update_seller, get_shop_by_name, update_shop, get_shop_by_seller_name
} = require("./mongodb");
const cors = require('cors');
const sort_products = require('./utils');
const Seller = require('./seller.js');
const dataBaseManagement = require('./db/dataBaseManagement.js')
const authentication = require('./security/authentication.js');
const signInPage = require('./security/signin.js');
const signUpPage = require('./security/signup.js');
const {GetSeller} = require("./seller");



const app = express();
app.use(cors({origin: true, credentials: true}))
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(3000, function () {
    console.log('connected');
});


dataBaseManagement.connectToDB();

app.post("/api/login", signInPage);
app.post("/api/register", signUpPage);

// app.use("/api/*", authentication.authenticate);

app.post('/api/seller/product', Seller.AddProduct);

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
        .then(response => product = response);
    res.status(200).json({product: product});
});

app.get('/api/shops/:product_name', async function (req, res) {
    const {product_name} = req.params;
    let shops;
    await get_shops_by_product_name('online-shop', 'shop', product_name)
        .then(response => shops = response);
    res.status(200).json({shops: shops});
});

app.get('/api/products/like/:user', async function (req, res) {
    const {user} = req.params;
    let result;
    await get_favorite_base_username('online-shop', 'likes', user)
        .then(response => result = response);
    res.status(200).json({products: result.products});
});

app.post('/api/favorite/:username/:product', async function (req, res) {
    const {username, product} = req.params;
    let result;
    await get_favorite_base_username('online-shop', 'likes', username)
        .then(response => result = response);
    const products = result.products;
    for (let i = 0; i < product.length; i++) {
        if (products[i].name === product) {
            products.splice(i, 1);
            break;
        }
    }
    update_product('online-shop', 'likes', username, products);
    res.status(200).json({message: 'product removed to favorite successfully'});
});

app.post('/api/product/like', async function (req, res) {
    const {product, username} = req.body;
    let result;
    await get_favorite_base_username('online-shop', 'likes', username)
        .then(response => result = response);
    const products = result.products;
    products.push(product);
    update_product('online-shop', 'likes', username, products);
    res.status(200).json({message: "product added to favorite successfully"});
});

app.post('/api/report', async function (req, res) {
    const body = req.body;
    let report;
    await get_report('online-shop', 'reports', body['shopping name'])
        .then(response => report = response);
    const Reports = report.reports;
    Reports.push({date: new Date(), options: body.option,product:body['product_name']});
    update_report('online-shop', 'reports', body['shopping name'], Reports);
    res.status(200).json({message: 'ok'})
});

app.post('/api/seller/create', function (req, res) {
    const body = req.body;
    insertDocument('online-shop', 'seller', body);
    res.status(200).json({message: 'ok'});
});

app.post('/api/shops/create', async function (req, res) {
    const body = req.body;
    insertDocument('online-shop','shop',body);
    res.status(200).json({message:'ok'});
});

app.post('/api/reports/',async function (req, res) {
    const {name} = req.body;
    let shop;
    await get_report('online-shop','reports',name)
        .then(response=>shop=response);
    res.status(200).json({shopping:shop})
});

app.post('/api/product/insert',async function (req, res) {
   const body = req.body;
   let shop;
   await get_shop_by_seller_name('online-shop','shop',body['seller-name'])
       .then(response=>shop=response);
   const products = shop.products;
   const data = {name:body['product-name'],category:body['category'],url:body['url'],
                sub_category: body['subcategory'],price:body['price'],product_url:body['product_url']}
   products.push(data);
   update_shop('online-shop','shop',body['seller-name'],products);
   insertDocument('online-shop','products',data);
   res.status(200).json({message:'ok'});
});