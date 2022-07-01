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
