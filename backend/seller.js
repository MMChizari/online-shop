const { SellerClass } = require("./db/dataBaseManagement.js");

const CategoryClass = require("./db/dataBaseManagement.js").CategoryClass;
const ProductClass = require("./db/dataBaseManagement.js").ProductClass;
const ShopClass = require("./db/dataBaseManagement.js").ShopClass;

async function addProduct(req, res) {
  const { shopName, productName, price, pageLink, categoryName } = req.body;

  try {
    //getShop
    const shop = await ShopClass.findOne({
      shopName: shopName,
    });
    if (!shop) {
      return res.status(400).send("shopName is not available").end();
    }

    //get category
    const category = await CategoryClass.findOne({
      categoryName: categoryName,
    });
    if (!category) {
      return res.status(400).send("categoryName is not available").end();
    }

    //find product
    let product = await ProductClass.findOne({
      productName: productName,
    });

    //if product is not available
    if (!product) {
      product = new ProductClass({
        productName: productName,
        category: category,
      });
      await product.save();
    }

    shop.products.push({
      product: product,
      price: price,
      pageLink: pageLink,
    });
    const savedShop = await shop.save();

    return res
      .status(200)
      .send({ message: "product saved in shop successfully", shop: savedShop })
      .end();
  } catch (error) {
    return res.status(500).send(error.message).end();
  }
}

async function getSeller(req, res) {
  const sellerName = req.body.sellerName;

  try {
    const seller = await SellerClass.findOne({
      sellerName: sellerName,
    });

    return res.status(200).json({seller:seller});
  } catch (error) {
    return res.status(500).send(error.message).end();
  }
}

module.exports = {
  AddProduct: addProduct,
  GetSeller: getSeller
};
