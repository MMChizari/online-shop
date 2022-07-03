import React from "react";
import ProductRow from "./ProductRow";
import axios from "axios";

export default class FavoriteProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: [],username:''}
    }

    componentDidMount() {
        let username =localStorage.getItem("username");
        this.setState({username:username});
        axios.get(`http://localhost:3000/api/products/like/${username}`)
            .then(response=>{
                this.setState({products:response.data.products})
            })
    }

    render() {
        return (
            <div className={"container"}>
                <h3 style={{textAlign: "center",color:"white"}} className={"mt-4"}>Favorite Products</h3>
                <table className={"table table-dark table-hover"}>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Product Sub-Category</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => <ProductRow username={this.state.username} product={product}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}