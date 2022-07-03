import {Link} from "react-router-dom";
import React from "react";
import './css/ShopInfo.css';

export default class ShopInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let modal = document.getElementById(`ReportModal${this.props.shopping.name}`);

        let btn = document.getElementById(`BtnModal ${this.props.shopping.name}`);

        btn.onclick = function () {
            modal.style.display = "block";
        }

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    closeModal(event) {
        event.target.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    }

    submitAction(event) {
        event.preventDefault();
        const shopping_name = document.querySelector('input[name="shopping name"]').value;
        const shopping_address = document.querySelector('input[name="shopping address"]').value;
        const checked_checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        let array = [];
        for (let i = 0; i < checked_checkboxes.length; i++) {
            array.push(checked_checkboxes[i].value);
        }
        const data = {"shopping name": shopping_name,'product_name':`${this.props.product}`, "shopping address": shopping_address, option: array};
        fetch('http://localhost:3000/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(json => {
            if (json.message === 'ok') {
                event.target.parentElement.parentElement.parentElement.style.display = 'none';
            }
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.shopping.name}</td>
                <td>{this.props.shopping.city}</td>
                <td>{this.props.shopping.products.filter(c => c.name = this.props.product)[0].price}</td>
                <td><a href={`${this.props.shopping.link}`} className={"btn btn-primary"}>Buy!</a></td>
                <td>
                    <button className={"btn btn-danger"} id={`BtnModal ${this.props.shopping.name}`}>Report</button>
                    <div className={`modal`} id={`ReportModal${this.props.shopping.name}`}>
                        <div className={"modal-content"}>
                            <div className="modal-header bg-danger">
                                <h2>Report</h2>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(event) => this.submitAction(event)} method={"post"}>
                                    <p>What is this product problem?</p>
                                    <div className="form-check">
                                        <input type={"checkbox"} className={"form-check-input"}
                                               name={"option"} value={"price or investment"}/>
                                        <label className={"form-check-label"}>Price or investment isn't correct</label>
                                    </div>
                                    <div className="form-check">
                                        <input type={"checkbox"} className={"form-check-input"}
                                               name={"option"} value={"track my order"}/>
                                        <label className={"form-check-label"}>I want to track my order</label>
                                    </div>
                                    <input type={"hidden"} name={"shopping address"} value={this.props.shopping.city}/>
                                    <input type="hidden" name={"shopping name"} value={this.props.shopping.name}/>
                                    <button className={"btn btn-success col-6 mt-4"} type={"submit"}>Submit Report
                                    </button>
                                    <button className={"btn btn-primary col-6 mt-4"} onClick={(event) => {
                                        this.closeModal(event)
                                    }} type={"button"}>Close
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}