const mongodb = require('mongodb').MongoClient;
const connection_url = 'mongodb://localhost:27017';

function create_database(database_name) {
    mongodb.connect(`${connection_url}/${database_name}`, function (err, db) {
        if (err) throw err;
        console.log('Database created');
        db.close();
    })
}

function create_collection(collection_name, database_name) {
    mongodb.connect(connection_url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(database_name);
        dbo.createCollection(collection_name, function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}

function insert_document(database_name, collection_name, object) {
    mongodb.connect(connection_url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(database_name);
        dbo.collection(collection_name).insertOne(object, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

function check_user_exist(database_name, collection_name, object) {
    return new Promise(function (resolve, reject) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).find({
                username: object.username,
                password: object.password
            }).toArray(function (err, result) {
                if (err) reject(err);
                if (result.length === 0) {
                    reject({code: 404})
                }
                resolve({code: 200});
                db.close();
            });
        });
    });
}

function check_username_exist(database_name, collection_name, username) {
    return new Promise(function (resolve, reject) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).find({username: username}).toArray(function (err, result) {
                if (err) reject({code: 404});
                if (result.length === 0) {
                    reject({code: 404})
                }
                resolve({code: 200});
                db.close();
            });
        });
    });
}

function getProducts(database_name, collection_name) {
    return new Promise((resolve, reject) => {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).find({}).toArray(function (err, result) {
                resolve(result);
                db.close();
            });
        });
    });
}

function get_documents_by_category(database_name, collection_name, category) {
    return new Promise(function (resolve) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).find({
                category: category.category,
                sub_category: category.sub_category
            }).toArray(function (error, result) {
                resolve(result);
                db.close();
            });
        });
    });
}

function get_product_by_name(database_name, collection_name, product_name) {
    return new Promise(function (resolve) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).findOne({name: product_name}, function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        });
    });
}

function get_shops(database_name, collection_name) {
    return new Promise(function (resolve, reject) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).find({}).toArray(function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        });
    });
}

function get_shops_by_product_name(database_name, collection_name, product_name) {
    return new Promise(async function (resolve) {
        let shops;
        await get_shops(database_name, collection_name).then(response => shops = response);
        let desired_shops = [];
        for (let i = 0; i < shops.length; i++) {
            const shop = shops[i];
            for (let j = 0; j < shop.products.length; j++) {
                if (shop.products[j].name === product_name) {
                    desired_shops.push(shop);
                }
            }
        }
        resolve(desired_shops);
    });
}

function get_shop_by_name(database_name, collection_name, shop_name) {
    return new Promise(function (resolve, reject) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).find({name: shop_name}).toArray(function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        });
    });
}

function get_favorites_by_username(database_name, collection_name, username) {
    return new Promise(function (resolve) {
        mongodb.connect(connection_url, function (error, db) {
            if (error) throw error;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).findOne({username: username}, function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        });
    });
}

function update_favorite_products(database_name, collection_name, username, products) {
    mongodb.connect(connection_url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(database_name);
        const query = {username: username};
        const newValue = {$set: {products: products}};
        dbo.collection(collection_name).updateOne(query, newValue, function (err, result) {
            if (err) throw err;
            console.log('products updated');
            db.close();
        });
    });
}


function get_reports(database_name, collection_name, shop_name) {
    return new Promise(function (resolve) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).findOne({name: shop_name}, function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        })
    });
}

function update_shop(database_name, collection_name, seller_name, objects) {
    mongodb.connect(connection_url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(database_name);
        const query = {sellerName: seller_name};
        const newValue = {$set: {products: objects}};
        dbo.collection(collection_name).updateOne(query, newValue, function (err, result) {
            if (err) throw err;
            console.log('shop updated');
            db.close();
        });
    });
}

function update_reports(database_name, collection_name, shop_name, reports) {
    mongodb.connect(connection_url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(database_name);
        const query = {name: shop_name};
        const newValue = {$set: {reports: reports}};
        dbo.collection(collection_name).updateOne(query, newValue, function (err, result) {
            if (err) throw err;
            console.log('reports updated');
            db.close();
        });
    });
}

function get_seller_by_name(database_name, collection_name, username) {
    return new Promise(function (resolve) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).findOne({name: username}, function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        });
    });
}

function update_seller_shops(database_name, collection_name, username, products) {
    mongodb.connect(connection_url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(database_name);
        const query = {name: username};
        const newValue = {$set: {shops: products}};
        dbo.collection(collection_name).updateOne(query, newValue, function (err, result) {
            if (err) throw err;
            console.log('products updated');
            db.close();
        });
    });
}

function get_shop_base_seller(database_name, collection_name, seller_name) {
    return new Promise(function (resolve) {
        mongodb.connect(connection_url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database_name);
            dbo.collection(collection_name).findOne({sellerName: seller_name}, function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        });
    });
}


const Object = {username: 'asdfQ234', password: 'a1234567S', email: 'mos@gmal.com'};
module.exports.check_user_exist = check_user_exist
module.exports.insert = insert_document
module.exports.create_collection = create_collection
module.exports.create_database = create_database
module.exports.check_username_exist = check_username_exist
module.exports.all_products = getProducts
module.exports.get_docuemts_by_category = get_documents_by_category
module.exports.get_document_by_name = get_product_by_name
module.exports.get_shops_by_product_name = get_shops_by_product_name
module.exports.get_shop_by_name = get_shop_by_name
module.exports.insertDocument = insert_document
module.exports.get_favorite_base_username = get_favorites_by_username
module.exports.update_product = update_favorite_products
module.exports.get_report = get_reports
module.exports.update_report = update_reports
module.exports.get_seller_by_name = get_seller_by_name
module.exports.update_seller = update_seller_shops
module.exports.get_shop_by_seller_name = get_shop_base_seller
module.exports.update_shop = update_shop