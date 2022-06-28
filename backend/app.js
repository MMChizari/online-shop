const express = require('express');
const mongodb = require('./mongodb');
const bodyparser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.listen(3000, function () {
    console.log('connected');
});
app.post('/api/login', async function (req, res) {
    let result;
    await mongodb.check_user_exist('online-shop', 'users', req.body)
        .then(res=>result=res)
        .catch(err=>result=err);
    if (result.code === 200) {
        res.redirect('/home');
    } else {
        res.status(400).json({'message': 'error'});
    }
});
app.post('/api/register', async function (req, res) {
    const body = req.body;
    let result;
    await mongodb.check_user_exist('online-shop','users',body)
        .then(res=>result=res)
        .catch(err=>result=err);
    if (result.code === 404) {
        mongodb.insert('online-shop', 'users', body);
        res.status(200).json({'message':'document inserted successfully'})
    }
});
app.get('/username/:user',async function (req, res) {
    const username = req.params.user;
    let result;
    await mongodb.check_username_exist('online-shop','users',username)
        .then(response=>result=response).catch(error=>result=error);
    if (result.code===404){
        res.status(200).json({'message':'ok'})
    }else{
        res.status(404).json({'message':'error'})
    }
});
app.get('/api/products',async function (req, res) {
    let products;
    await mongodb.all_products('online-shop','products')
        .then(response=>products=response);
    res.status(200).json({"products":products});
})
app.post('/api/products/insert',async function (req,res){
    const product = req.body;
    mongodb.insert('online-shop','products',product);
    console.log('product inserted successfully');
})