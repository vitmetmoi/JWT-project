import React from 'react';
import './Login.scss'
const Login = (props) => {
    return (

        <div className='login-container'>
            <div className='container'>
                <div className='row'>
                    <div className='content-left col-md-8 '>
                        <div className='left-up'>Login</div>
                        <div className='left-down'>Access directly to your account</div>
                    </div>
                    <div className='content-right col-md-4 col-xs-12  '>
                        <div className='login-form'>

                            <div className='form-content'>

                                <div class="form-group">
                                    <label for="exampleInputEmail1">Username</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"></input>

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Password</label>
                                    <input type="email" class="form-control" id="exampleInputPassword" aria-describedby="emailHelp" placeholder="Enter password"></input>

                                </div>


                                <button className='btn btn-primary'>Login</button>
                                <hr />
                                <button className='register btn btn-success'>Create new account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;