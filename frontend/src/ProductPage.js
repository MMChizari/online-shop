import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import './css/ProductPage.css'
import ShopInfo from "./ShopInfo";

export default function ProductPage() {
    const navigate = useNavigate();
    const {product_name} = useParams();
    const [shops, setShops] = useState([]);
    const [product, setProduct] = useState({});
    function getMaximumPrice(){
        let maximum = 0;
        for(let shop=0;shop<shops.length;shop++){
            const shop_products = shops[shop].products;
            for(let j=0;j<shop_products.length;j++){
                if (shop_products[j].name===product_name && shop_products[j].price>maximum){
                    maximum=shop_products[j].price;
                }
            }
        }
        return maximum;
    }

    function getMinimumPrice(){
        let minimum = 1000000000;
        for(let shop=0;shop<shops.length;shop++){
            const shop_products = shops[shop].products;
            for(let j=0;j<shop_products.length;j++){
                if (shop_products[j].name===product_name && shop_products[j].price<minimum){
                    minimum=shop_products[j].price;
                }
            }
        }
        return minimum;
    }
    function fetch_product_and_shops() {
        axios.get(`http://localhost:3000/api/shops/${product_name}`)
            .then(response => setShops(response.data.shops));
        axios.get(`http://localhost:3000/api/product/${product_name}`)
            .then(response => setProduct(response.data.product));
    }

    useEffect(()=>{
        fetch_product_and_shops();
    },[]);

    return (
        <div className={"container"}>
            <div className="product-container bg-white">
                <div className="image">
                    <img src={product.url} height={"250px"} alt={product.name}/>
                </div>
                <div className="product-details">
                    <h3>{product.name}</h3>
                    <h4>Category <span className="badge category">{product.category}</span></h4>
                    <h4>Sub-Category <span className="badge sub-category">{product.sub_category}</span></h4>
                    {getMaximumPrice()>0 && <p>Price from <span>{getMinimumPrice()}$</span> to <span>{getMaximumPrice()}$</span></p>}
                </div>
            </div>
            <table className="table table-dark" style={{marginTop:"10px"}}>
                <thead>
                <tr>
                    <th>Shop name</th>
                    <th>Shop address</th>
                    <th>Product price</th>
                    <th>Buy Product</th>
                    <th>Report</th>
                </tr>
                </thead>
                <tbody>
                {shops.map(shop=><ShopInfo  shopping={shop} product={product_name}/>)}
                </tbody>
            </table>
        </div>
    )
}