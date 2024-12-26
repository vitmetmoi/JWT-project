import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import './Login.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginService } from '../../service/userService'
import { UserContext } from '../../store/UserContext';
const Login = (props) => {
    let history = useHistory();
    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const defaultObjValidInput = {
        loginValueIsValid: true,
        passwordIsValid: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const { user, login, logout } = useContext(UserContext);
    useEffect(() => {

    }, [])

    const validateInput = () => {
        setObjValidInput(defaultObjValidInput);
        if (!loginValue || loginValue === '') {
            setObjValidInput({ ...defaultObjValidInput, loginValueIsValid: false });
            toast.warn('Missing phone number or email parameter!');
            return false;
        }
        if (!password || password === '') {
            setObjValidInput({ ...defaultObjValidInput, passwordIsValid: false });
            toast.warn('Missing password parameter!');
            return false;
        }
        return true;
    }

    const handleOnClickLogin = async () => {
        if (validateInput()) {
            let data = {
                loginValue: loginValue,
                password: password
            }
            let res = await loginService(data);


            if (res.data && res.data.EC === 0) {
                login(res.data.DT);
                console.log('res', res.data.DT)

                let data = {
                    isAuthentication: true,
                    token: "fake_token1233123123123"
                }

                history.push('/user');

            }
            else {
                toast.warn(res.data.EM);
            }
        }

    }
    const handleOnClickRegister = () => {
        history.push("/register");
    }

    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            handleOnClickLogin();
        }
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
                                    <input
                                        type="email"
                                        className={objValidInput.loginValueIsValid ? "form-control" : "is-invalid form-control"}
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter phone number or email"
                                        value={loginValue}
                                        onChange={(event) => setLoginValue(event.target.value)}
                                    ></input>

                                </div>
                                <div class="form-group">
                                    {/* <label for="exampleInputEmail1">Password</label> */}
                                    <input
                                        type="password"
                                        className={objValidInput.passwordIsValid ? "form-control" : "is-invalid form-control"}
                                        id="exampleInputPassword"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        onKeyDown={(event) => handleOnKeyDown(event)}
                                    ></input>

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