import React, { useContext, useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
const Login = () => {
    const [success, setSuccess] = useState('');
    const {signIn} = useContext(AuthContext);
    const handleSignIn = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
   
        signIn(email, password)
        .then(result=>{
          const  loggedUser = result.user;
            console.log(loggedUser);
            form.reset()
        })
        .catch(error=> console.error(error));
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSignIn}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='' required />
                    {/* <p><small className="error">{error}</small></p> */}
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p className='new-account'><small>New to Ema-john?  <Link className='orange' to="/signup">Create New Account</Link></small></p>
        </div>
    );
};

export default Login;