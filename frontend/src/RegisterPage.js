import './css/LoginPage.css';

export default function RegisterPage() {
    const passwordChange = () => {
        const password_value = document.getElementById('password').value;
        const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/);
        if (!regex.test(password_value)) {
            document.querySelector('.password').classList.remove('d-none');
        } else {
            document.querySelector('.password').classList.add('d-none');
        }
    }
    const toggle_Password = (event) => {
        const checkboxState = event.target.checked;
        const element = document.querySelector('#password');
        if (checkboxState) {
            element.type = "text";
        } else {
            element.type = "password";
        }
    }
    return (
        <div className="loginContainer">
            <h3 className='text-center'>SIGN UP</h3>
            <form action="/api/register" className='was-validated' method='post'>
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
                <div className="mb-3 row">
                    <div className="col-2">
                        <label htmlFor="email" className="form-label">Email </label>
                    </div>
                    <div className="col-10">
                        <input type="email" id="email" required className="form-control" name="email"/>
                    </div>
                    <div className='valid-feedback'>Valid</div>
                    <div className='invalid-feedback'>invalid email</div>
                    <div className='alert alert-danger mt-2 d-none email'><strong>Error!</strong> The entered email is
                        not valid
                    </div>
                </div>
                <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox"
                               onChange={(event) => toggle_Password(event)}/> show password
                    </label>
                </div>
                <button type="submit" className="btn btn-warning col-12">Register</button>
            </form>
        </div>
    )
}