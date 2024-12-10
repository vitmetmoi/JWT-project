import React from 'react';
import './Register.scss'
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
const Register = (props) => {
    let history = useHistory();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnClickLogin = () => {
        history.push('/login')
    }

    const handleOnClickRegister = () => {
        let userData = {
            userName: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        console.log("check state", userData)
    }
    return (

        <div className='Register-container'>
            <div className='container'>

                <div className='content-right col-md-12 col-xs-12 mt-5 '>
                    <div className='Register-form col-md-4 ml-1'>
                        <div className='form-content'>

                            <div class="form-group">
                                <h1 className='text-center text-primary d-block'>Register</h1>
                            </div>

                            <div class="form-group">

                                <input
                                    type="text"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter username"
                                    onChange={(event) => setUserName(event.target.value)}
                                ></input>

                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="exampleInputPassword"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(event) => setEmail(event.target.value)}
                                ></input>
                            </div>
                            <div class="form-group">

                                <input
                                    type="password"
                                    class="form-control"
                                    id="exampleInputPassword"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter new password"
                                    onChange={(event) => setPassword(event.target.value)}
                                ></input>

                            </div>

                            <div class="form-group">

                                <input
                                    type="password"
                                    class="form-control"
                                    id="exampleInputPassword"
                                    aria-describedby="emailHelp"
                                    placeholder="Confirm password"
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                ></input>

                            </div>



                            <button
                                onClick={() => handleOnClickRegister()}
                                className='btn btn-primary mt-3'>Register</button>
                            <hr className='opacity-50'></hr>
                            <span
                                onClick={() => handleOnClickLogin()}
                                className='have-account text-center text-primary'>Have your own account?</span>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default Register;