export default function ProductCard(props){
    return(
        <div className={"card"} style={{width:"300px"}}>
            <img className={"card-img-top"} src={props.Product.url} alt={"product image"}/>
            <div className={"card-body"}>
                <h4>{props.Product.name}</h4>
                <div className={"row"}>
                    <i className={"col-6"}>{props.Product.category}</i>
                    <i className={"col-6"}>{props.Product.price}</i>
                </div>
                <a href={"#"} className={"btn btn-primary col-12"}>Add to Cart</a>
            </div>
        </div>
    )
}