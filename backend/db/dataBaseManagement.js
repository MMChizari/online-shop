const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect("mongodb://localhost/online_shop_test")
    .then(() => console.log("connected to db successfully"))
    .catch(() => console.log("connection to db failed"));
};

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSeler: { type: Boolean, default: false },
});

const categorySchema = new mongoose.Schema({
  categoryName: String,
  parent: this,
  child: {
    type: [this],
    default: [],
  },
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: categorySchema,
});

const shopSchema = new mongoose.Schema({
  shopName: { type: String, required: true, unique: true },
  products: {
    type: [
      {
        product: { type: productSchema, required: true },
        price: { type: Number, required: true },
        pageLink: String,
        reports: { type: [String], default: [] },
      },
    ],
    default: [],
  },
});

const sellerSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  sellerEmail: { type: String, required: true, unique: true },
  sellerPhone: { type: String, required: true, unique: true },
  shops: [shopSchema],
});

const UserClass = mongoose.model("user", userSchema);
const SellerClass = mongoose.model("seller", sellerSchema);
const ShopClass = mongoose.model("shop", shopSchema);
const ProductClass = mongoose.model("product", productSchema);
const CategoryClass = mongoose.model("category", categorySchema);

module.exports = {
  connectToDB: connectToDB,
  UserClass: UserClass,
  SellerClass: SellerClass,
  ShopClass: ShopClass,
  ProductClass: ProductClass,
  CategoryClass: CategoryClass,
};
