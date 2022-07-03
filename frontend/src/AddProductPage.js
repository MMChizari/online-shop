import React from "react";
import {useNavigate} from "react-router-dom";

export default function AddProductPage() {
    const navigate = useNavigate();
    const categoryClick = (event) => {
        const subcategories = {
            Mobile: ['Samsung', 'Xiaomi', 'Apple'],
            Tablet: ['Samsung', 'Xiaomi', 'Apple'],
            Laptop: ['Lenovo', 'Asus', 'Apple']
        }
        const category_name = event.target.value;
        const sub_category = subcategories[category_name];
        document.querySelectorAll('select[name=subcategory] option').forEach(o => o.remove());
        const sub_category_element = document.querySelector('select[name=subcategory]')
        for (let i = 0; i < sub_category.length; i++) {
            const subCategory = sub_category[i];
            let newOption = new Option(`${subCategory}`, `${subCategory}`);
            sub_category_element.appendChild(newOption);
        }
    }

    const submitAction = (event) => {
        event.preventDefault();
        const seller_name = document.getElementsByName('seller-name')[0].value;
        const product_name = document.getElementsByName('product-name')[0].value;
        const price = document.getElementsByName('price')[0].value;
        const product_url = document.getElementsByName('product_url')[0].value;
        const category = document.getElementsByName('category')[0].value;
        const subcategory = document.getElementsByName('subcategory')[0].value;
        const url = document.getElementsByName('url')[0].value;
        const data = {
            'seller-name': seller_name, 'product-name': product_name,'url':url,
            'price': price, 'product_url': product_url, 'category': category, 'subcategory': subcategory
        };
        fetch('http://localhost:3000/api/product/insert', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => {
                if (json.message === 'ok') {
                    navigate('/home',{replace:true});
                }
            })
    }

    return (
        <div className="container mt-5" style={{backgroundColor: "azure"}}>
            <h2 style={{textAlign: "center"}}>Add new product:</h2>
            <form method="post" onSubmit={(event) => submitAction(event)} className={"mt-3"}>
                <div className={"mb-3"}>
                    <label className="form-label">Seller name: </label>
                    <input className="form-control" type="text" name="seller-name"/>
                </div>
                <div className={"mb-3"}>
                    <label className="form-label" htmlFor={"pname"}>Product name: </label>
                    <input className="form-control" type="text" id={"pname"} name="product-name"/>
                </div>
                <div className="row mb-3">
                    <div className={"col"}>
                        <select className="form-select" defaultValue={"disabled"} name="category">
                            <option value={"disabled"} disabled>Select Category</option>
                            <option onClick={(event) => categoryClick(event)} value="Mobile">Mobile</option>
                            <option onClick={(event) => categoryClick(event)} value="Tablet">Tablet</option>
                            <option onClick={(event) => categoryClick(event)} value="Laptop">Laptop</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select" defaultValue={"disabled"} name="subcategory">
                            <option value={"disabled"} disabled>Select SubCategory</option>
                        </select>
                    </div>

                </div>
                <div className={"mb-3"}>
                    <label className="form-label">Price: </label>
                    <input className="form-control" type="number" name="price"/>
                </div>
                <div className={"mb-3"}>
                    <label className="form-label">Product image url: </label>
                    <input className="form-control" type="text" name="url"/>
                </div>
                <div className={"mb-3"}>
                    <label className="form-label">Product url: </label>
                    <input className="form-control" type="text" name="product_url"/>
                </div>
                <button type={"submit"} className="btn btn-primary col-12">Submit</button>
            </form>
        </div>
    )

}