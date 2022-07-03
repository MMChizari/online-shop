import {Link} from "react-router-dom";

export default function ProductCard(props){
    function add_to_list(){
        const product = props.Product;
        const username = localStorage.getItem("username");
        const data = {product:product,username:username};
        fetch('http://localhost:3000/api/product/like',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(response=>response.json())
            .then(json=>{
                if (json.message==='product added to favorite successfully'){
                    console.log(json.message);
                }
            })
    }
    return(
        <div className="card" style={{width:"250px",margin:"10px"}}>
            <img className={"card-img-top"} src={props.Product.url} height={"200px"} alt={`image ${props.Product.name}`}/>
            <div className={"card-body"}>
                <h4 style={{textAlign:"center"}}><Link
                   style={{textDecoration:"none",color:"black"}} to={`/product/${props.Product.name}`}>{props.Product.name}</Link></h4>
                <div className={"row"}>
                    <i className={"col-6"}>Category: {props.Product.category}</i>
                    <i className={"col-6"}>Price: {props.Product.price}$</i>
                </div>
                <div className={"row"}>
                    <button onClick={add_to_list} className="btn btn-danger col-12">Like</button>
                </div>
            </div>
        </div>
    )
}