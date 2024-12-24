import React from 'react';
import './Register.scss'
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserService } from '../../service/userService'
const Register = (props) => {
    let history = useHistory();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const defaultValidInput = {
        isValidUserName: true,
        isValidEmail: true,
        isValidPhoneNumber: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    const handleOnClickLogin = () => {
        history.push('/login')
    }

    const checkValidate = () => {
        setObjCheckInput(defaultValidInput);

        if (!userName) {
            setObjCheckInput({ ...defaultValidInput, isValidUserName: false });
            toast.error('Missing parameter username!')
            return false;
        }
        let regx = /^\S+@\S+\.\S+$/;
        if (!regx.test(email)) {
            setObjCheckInput({
                ...defaultValidInput,
                isValidEmail: false
            });
            toast.error('Please enter a valid email!')
            return false;
        }
        regx = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (!regx.test(phoneNumber)) {
            setObjCheckInput({ ...defaultValidInput, isValidPhoneNumber: false });
            toast.error('Missing parameter username!')
            return false;
        }
        if (!password) {
            setObjCheckInput({
                ...defaultValidInput,
                isValidPassword: false
            });
            toast.error('Missing parameter password!')
            return false;
        }
        if (!confirmPassword) {
            setObjCheckInput({
                ...defaultValidInput,
                isValidConfirmPassword: false
            });
            toast.error('Please confirm your password!')
            return false;
        }
        if (password !== confirmPassword) {
            setObjCheckInput({
                ...defaultValidInput,
                isValidConfirmPassword: false
            });
            toast.error("Confirm password doesn't equal to previous password!"
            )
            return false;
        }
        return true;
    }

    const handleOnClickRegister = async () => {

        if (checkValidate()) {
            let userData = {
                userName: userName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
            }

            let res = await createUserService(userData);

            if (res) {
                res = res.data
            }

            if (res && res.EC === 0) {
                res = res.data;
                toast.success("Create account completed!")
                history.push('/login')
            }
            else if (res && res.EC === -1 && res.DT === "email") {

                setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
                toast.warn(res.EM)

            }
            else if (res && res.EC === -1 && res.DT === "phoneNumber") {

                setObjCheckInput({ ...defaultValidInput, isValidPhoneNumber: false })
                toast.warn(res.EM)
            }
            else {
                toast.warn("Error!");
            }
        }
        else {
            toast.warn("Error!");
        }


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
                                    className={objCheckInput.isValidUserName ? "form-control" : "is-invalid form-control"}
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter username"
                                    onChange={(event) => setUserName(event.target.value)}
                                ></input>

                            </div>


                            <div class="form-group">
                                <input

                                    type="text"
                                    className={objCheckInput.isValidEmail ? "form-control" : "is-invalid form-control"}
                                    id="exampleInputPassword"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(event) => setEmail(event.target.value)}
                                ></input>
                            </div>

                            <div class="form-group">
                                <input
                                    type="text"
                                    className={objCheckInput.isValidPhoneNumber ? "form-control" : "is-invalid form-control"}
                                    id="exampleInputPassword"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter phone number"
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                ></input>
                            </div>

                            <div class="form-group">

                                <input
                                    type="password"
                                    className={objCheckInput.isValidPassword ? "form-control" : "is-invalid form-control"}
                                    id="exampleInputPassword"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter new password"
                                    onChange={(event) => setPassword(event.target.value)}
                                ></input>

                            </div>

                            <div class="form-group">

                                <input
                                    type="password"
                                    className={objCheckInput.isValidConfirmPassword ? "form-control" : "is-invalid form-control"}
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