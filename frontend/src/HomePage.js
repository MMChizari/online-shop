import './css/HomePage.css';
import React from "react";
import axios from "axios";
export default class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state={products:[]}
    }
    componentDidMount() {
        fetch('http://localhost:3000/api/products').then(response=>console.log(response));
    }

    render(){
        return (
            <div className={"container-fluid"}>
                <div className="row">
                    <input type={"search"} className={"form-control"} placeholder={"Enter product name ..."}/>
                </div>
                <div className={"content"}>
                    <div className={"products"}>
                        {/*{products.map(p=><ProductCard Product={p}/>)}*/}
                    </div>
                    <div className={"sidebar"}>
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-mdb-toggle="dropdown" aria-expanded="false">
                                Categories
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <a className="dropdown-item">
                                        &laquo; Mobile Tablet
                                    </a>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        <li>
                                            <a className="dropdown-item"> &laquo; Mobile</a>
                                            <ul className="dropdown-menu dropdown-submenu">
                                                <li>
                                                    <a className="dropdown-item">Samsung</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item">Xiaomi</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item">Apple</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a className="dropdown-item">&laquo; Tablet</a>
                                            <ul className="dropdown-menu dropdown-submenu">
                                                <li>
                                                    <a className="dropdown-item">Samsung</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item">Xiaomi</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item">Apple</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="dropdown-item">
                                        &laquo; Laptop
                                    </a>
                                    <ul className={"dropdown-menu dropdown-submenu"}>
                                        <li>
                                            <a className={"dropdown-item"}>Samsung</a>
                                            <a className={"dropdown-item"}>Xiaomi</a>
                                            <a className={"dropdown-item"}>Apple</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}