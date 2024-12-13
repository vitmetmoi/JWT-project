import React from 'react';
import { useHistory } from "react-router-dom";
import './Login.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = (props) => {
    let history = useHistory();

    const handleOnClickLogin = () => {
        toast.info("Wow so easy!");
    }
    const handleOnClickRegister = () => {
        history.push("/register");
    }
    return (

        <div className='login-container'>
            <div className='container'>
                <div className='row'>
                    <div className='content-left col-md-8 d-none d-sm-block'>
                        <div className='left-up text-primary'>Login</div>
                        <div className='left-down'>Access directly to your account</div>
                    </div>
                    <div className='content-right col-md-4 col-xs-12  '>
                        <div className='login-form'>

                            <div className='form-content mt-md-3'>

                                <div class="form-group">
                                    <h1 className='text-center text-primary d-block d-sm-none'>Login</h1>
                                </div>

                                <div class="form-group">
                                    {/* <label for="exampleInputEmail1">Username</label> */}
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"></input>

                                </div>
                                <div class="form-group">
                                    {/* <label for="exampleInputEmail1">Password</label> */}
                                    <input type="email" class="form-control" id="exampleInputPassword" aria-describedby="emailHelp" placeholder="Enter password"></input>

                                </div>


                                <button
                                    onClick={() => handleOnClickLogin()}
                                    className='btn btn-primary mt-3'>Login</button>
                                <span className='forgot-password'>Forgot your password?</span>
                                <hr className='opacity-50'></hr>
                                <button onClick={() => handleOnClickRegister()} className='register btn btn-success'>Create new account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;