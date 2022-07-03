export default function ProductRow(props) {
    const deleteProduct = (event) => {
        fetch(`http://localhost:3000/api/favorite/${props.username}/${props.product.name}`,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
        }).then(response=>response.json())
            .then(json=>{
                if (json.message==='product removed to favorite successfully'){
                    event.target.parentElement.parentElement.style.display='none'
                }
            })
    }
    return (
        <tr>
            <td>{props.product.name}</td>
            <td>{props.product.category}</td>
            <td>{props.product.sub_category}</td>
            <td>
                <button className={"btn btn-danger"} onClick={(event)=>deleteProduct(event)}>DELETE</button>
            </td>
        </tr>
    )
}