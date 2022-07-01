import {Link} from "react-router-dom";
import React from "react";
import './css/ShopInfo.css';
export default class ShopInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let modal = document.getElementById(`ReportModal ${this.props.shopping.name}`);

        let btn = document.getElementById(`BtnModal ${this.props.shopping.name}`);

        let span = document.getElementsByClassName("close")[0];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.shopping.name}</td>
                <td>{this.props.shopping.city}</td>
                <td>{this.props.shopping.products.filter(c => c.name = this.props.product)[0].price}</td>
                <td><Link to={`/shopping/buy/${this.props.shopping.name}`} className={"btn btn-primary"}>Buy!</Link></td>
                <td>
                    <button className={"btn btn-danger"} id={`BtnModal ${this.props.shopping.name}`}>Report</button>
                    <div className={`modal`} id={`ReportModal ${this.props.shopping.name}`}>
                        <div className={"modal-content"}>
                            <div className="modal-header">
                                <span className="close">&times;</span>
                                <h2>Report</h2>
                            </div>
                            <div className="modal-body">
                                <p>Some text in the Modal Body</p>
                                <p>Some other text...</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}