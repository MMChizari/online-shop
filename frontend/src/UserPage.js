import {useNavigate} from "react-router-dom";

export default function UserPage(){
    const navigate = useNavigate();
    const submitAction = (event)=>{
        event.preventDefault();
        const mobile = document.getElementById('mobile').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const data = {mobile:mobile,address:address,email:email,name:name};
        fetch('http://localhost:3000/api/seller/create',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(data)
        }).then(response=>response.json())
            .then(json=>{
                if (json.message==='ok'){
                    navigate('/home',{replace:true});
                }
            })
    }
    return(
        <div className={"container"} style={{border:"2px solid grey",padding:"10px",marginTop:"50px"}}>
            <h3 className={"text-center bg-warning"}>Edit User</h3>
            <form method={"post"} onSubmit={submitAction}>
                <div className={"mb-3"}>
                    <label htmlFor={"mobile"} className={"form-label"}>Seller Mobile:</label>
                    <input type={"number"} className={"form-control"} id={"mobile"} name={"mobile"}/>
                </div>
                <div className={"mb-3"}>
                    <label htmlFor={"address"} className={"form-label"}>Seller Address:</label>
                    <input type={"text"} className={"form-control"} id={"address"} name={"address"}/>
                </div>
                <div className={"mb-3"}>
                    <label htmlFor={"email"} className={"form-label"}>Seller Email:</label>
                    <input type={"email"} className={"form-control"} id={"email"} name={"email"}/>
                </div>
                <div className={"mb-3"}>
                    <label htmlFor={"name"} className={"form-label"}>Seller Name:</label>
                    <input type={"text"} className={"form-control"} id={"name"} name={"name"}/>
                </div>
                <button className={"btn btn-success col-12"}>Create</button>
            </form>
        </div>
    )
}