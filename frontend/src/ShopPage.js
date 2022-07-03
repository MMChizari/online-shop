import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ShopPage() {
    const [row_number, setRowNumber] = useState(1);
    const navigate = useNavigate();
    function deleteRow(event) {
        setRowNumber(row_number - 1);
        event.target.parentElement.parentElement.style.display = 'none';
    }

    document.querySelectorAll('.delete').onclick = function (event) {
        event.target.parentElement.parentElement.style.display = 'none';
    }
    const adding_row = async () => {
        setRowNumber(row_number + 1);
        const table = document.querySelector('.table-body');
        const row = table.insertRow(table.children.length - 1);
        const FirstCell = row.insertCell(0);
        const SecondCell = row.insertCell(1);
        const ThirdCell = row.insertCell(2);
        const FourthCell = row.insertCell(3);
        FirstCell.innerHTML = '<input type="text" name="shop-name">';
        SecondCell.innerHTML = '<input type="text" name="shop-link">';
        ThirdCell.innerHTML = '<input type="text" name="shop-city">';
        FourthCell.innerHTML = '<button class="btn btn-danger delete">DELETE</button>'
    }
    const submitAction = () => {
        const shop_elements_name = document.querySelectorAll('input[name=shop-name]');
        const shop_elements_link = document.querySelectorAll('input[name=shop-link]');
        const shop_elements_city = document.querySelectorAll('input[name=shop-city]');
        const seller_name = document.getElementById('seller-name').value;
        for(let node=0;node<shop_elements_name.length;node++){
            const name=shop_elements_name[node].value;
            const link=shop_elements_link[node].value;
            const city=shop_elements_city[node].value;
            const data = {sellerName:seller_name,name:name,link:link,city:city,products:[]};
            fetch('http://localhost:3000/api/shops/create',{
                headers:{
                    'Content-Type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response=>response.json())
                .then(json=>{
                   if (json.message==='ok'){
                       console.log('shop added successfully');
                   }
                });
        }
        navigate('/home',{replace:true});

    }
    return (
        <div className={"container"}>
            <h3 className={"display-3 text-center"} style={{color: "red"}}>Adding new shop</h3>
            <div>
                <label className={"form-label"} htmlFor={"seller-name"}>Seller name:</label>
                <input type={"text"} className={"form-control"} id={"seller-name"}/>
            </div>
            <table className={"table table-stripped"}>
                <thead>
                <tr>
                    <th>Shop name</th>
                    <th>Shop Link</th>
                    <th>Shop City</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody className={"table-body"}>
                <tr>
                    <td><input type="text" name={"shop-name"}/></td>
                    <td><input type="text" name={"shop-link"}/></td>
                    <td><input type="text" name="shop-city"/></td>
                    <td>
                        <button className="btn btn-danger delete" onClick={(event) => deleteRow(event)}>DELETE</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <button type={"button"} onClick={adding_row} className={"btn btn-primary col-6"}>Add +</button>
            <button type={"submit"} onClick={submitAction} className={"btn btn-success col-6"}>Submit</button>
        </div>
    )
}