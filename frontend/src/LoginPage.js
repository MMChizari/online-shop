import './css/LoginPage.css';
import {Link,useNavigate} from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const togglePassword = (event) => {
        const checkboxState = event.target.checked;
        const element = document.querySelector('#password');
        if (checkboxState) {
            element.type = "text";
        } else {
            element.type = "password";
        }
    }
    const passwordChange = () => {
        const password_value = document.getElementById('password').value;
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/);
        if (!regex.test(password_value)) {
            document.querySelector('.password').classList.remove('d-none');
        } else {
            document.querySelector('.password').classList.add('d-none');
        }
    }
    const submitAction = (event) => {
        event.preventDefault();
        const username_value = document.getElementById('username').value;
        const password_value = document.getElementById('password').value;
        const data = {username: username_value, password: password_value};
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json=>{
                if (json.message==="ok"){
                    navigate('/home',{replace:true});
                }
            });
    }
    return (
        <div className="loginContainer">
            <h3 className='text-center'>Login</h3>
            <form onSubmit={(event) => submitAction(event)} action="/api/login" className='was-validated' method='post'>
                <div className="mb-3 mt-3 row">
                    <div className="col-2">
                        <label htmlFor="username" className="form-label">Username </label>
                    </div>
                    <div className="col-10">
                        <input type="text" id="username" name="username" required className="form-control"/>
                    </div>
                    <div className='valid-feedback'>Valid</div>
                    <div className='invalid-feedback'>Please fill this field</div>
                    <div className='alert alert-danger d-none mt-2 username'><strong>Error!</strong> This user has
                        already registered
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-2">
                        <label htmlFor="password" className="form-label">Password </label>
                    </div>
                    <div className="col-10">
                        <input type="password" id="password" onChange={passwordChange} required
                               pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$' className="form-control"
                               name="password"/>
                    </div>
                    <div className='valid-feedback'>Valid</div>
                    <div className='invalid-feedback'>Please fill this field</div>
                    <div className='alert alert-danger d-none mt-2 password'><strong>Error!</strong><br></br> enter at
                        least 8 character including (1 lowercase,1 uppercase,1 digit) character
                    </div>
                </div>
                <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox"
                               onChange={(event) => togglePassword(event)}/> show password
                    </label>
                </div>
                <button type="submit" className="btn btn-success col-12">LOG IN</button>
                <p style={{textAlign: "center"}}>You don't have any account Register <Link
                    to="/register" style={{cursor: "pointer", color: "red"}}>Here</Link></p>
            </form>
        </div>
    )
}