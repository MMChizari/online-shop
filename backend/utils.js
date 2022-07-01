function sort_products(products,sort_action){
    if (sort_action==='Cheap'){
        products.sort(function (self, another) {
            return self.price - another.price
        });
    }else if(sort_action==='Expensive'){
        products.sort(function (self, another) {
            return another.price - self.price
        });
    }else{
        products.sort(function (self, another) {
            return Number(another.timestamp) - Number(self.timestamp)
        });
    }
    return products;
}
module.exports.sort_products = sort_products