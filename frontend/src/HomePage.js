import './css/HomePage.css';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import ProductCard from "./ProductCard";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [CopyProducts, setCopyProducts] = useState([]);
    const navigate = useNavigate()

    const add_product_click = ()=>{
        navigate('/add/product',{replace:true})
    }

    const favorite_click = () => {
        navigate('/favorites',{replace:true});
    }

    const search_change = (event) => {
        const search_content = event.target.value;
        if (event.target.value !== '') {
            const all_products = [];
            for (let i = 0; i < this.state.products.length; i++) {
                const product = this.state.products[i];
                if (product.name.indexOf(search_content) !== -1) {
                    all_products.push(product);
                }
            }
            setProducts(all_products);
        } else {
            setProducts(CopyProducts);
        }

    }

    const category_click = (event) => {
        event.preventDefault();
        const url = event.target.href.split('/');
        const main_category = url[3];
        const sub_category = url[4];
        axios.get(`http://localhost:3000/${main_category}/${sub_category}`)
            .then(response => setProducts(response.data.products));
    }

    const filter_products = (event) => {
        event.preventDefault();
        const url = event.target.href.split('/');
        const price_action = url[4];
        axios.post(`http://localhost:3000/Filter/${price_action}`, {products: this.state.products})
            .then(response => {
                setProducts(response.data.products);
            });
    }

    useEffect(() => {
        let dropdown = document.getElementsByClassName("dropdown-btn");
        for (let i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function () {
                this.classList.toggle("active");
                let dropdownContent = this.nextElementSibling;
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            });
        }
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                setProducts(response.data.products);
                setCopyProducts(response.data.products);
            });
    }, []);


    return (
        <div className="container-fluid">
            <div className="row">
                <input type={"search"} onChange={search_change} className={"form-control"}
                       placeholder={"Enter product name ..."}/>
            </div>
            <div className={"content"}>
                <div className={"products col-10"}>
                    {products.map((product) => <ProductCard key={product['_id']} Product={product}/>)}
                </div>
                <div className="sidenav">
                    <button className="dropdown-btn">Mobile Tablet
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">
                        <button className="dropdown-btn">Mobile
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-container">
                            <p><a href={"/Mobile/Samsung"}
                                  onClick={(event) => category_click(event)}>Samsung</a></p>
                            <p><a href={"/Mobile/Xiaomi"}
                                  onClick={(event) => category_click(event)}>Xiaomi</a></p>
                            <p><a href={"/Mobile/Apple"}
                                  onClick={(event) => category_click(event)}>Apple</a></p>
                        </div>
                        <button className="dropdown-btn">Tablet
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-container">
                            <p><a href={"/Tablet/Samsung"}
                                  onClick={(event) => category_click(event)}>Samsung</a></p>
                            <p><a href={"/Tablet/Xiaomi"}
                                  onClick={(event) => category_click(event)}>Xiaomi</a></p>
                            <p><a href={"/Tablet/Apple"}
                                  onClick={(event) => category_click(event)}>Apple</a></p>
                        </div>
                    </div>
                    <button className="dropdown-btn">Laptop
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">
                        <p><a href="/Laptop/Lenovo"
                              onClick={(event) => category_click(event)}>Lenovo</a></p>
                        <p><a href="/Laptop/Asus"
                              onClick={(event) => category_click(event)}>Asus</a></p>
                        <p><a href="/Laptop/Apple"
                              onClick={(event) => category_click(event)}>Apple</a></p>
                    </div>
                    <button className="dropdown-btn">Filter
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">
                        <p><a onClick={(event) => filter_products(event)} href="/Filter/Cheap">Cheapest
                            Price</a></p>
                        <p><a onClick={(event) => filter_products(event)} href="/Filter/Expensive">Expensive
                            Price</a></p>
                        <p><a onClick={(event) => filter_products(event)} href="/Filter/Newest">Newest</a></p>
                    </div>
                    <button onClick={favorite_click} className={"favorite"}>Favorite Products
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <button onClick={add_product_click} className={"favorite"}>Add Product
                        <i className="fa fa-caret-down"></i>
                    </button>
                </div>
            </div>
        </div>
    )

}