import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './UserModal.scss';
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import { createUserService, editUserService } from '../../service/userService'
function UserModal(props) {

    const defaultFormState = {
        userName: '',
        email: '',
        password: '',
        phoneNumber: '',
        genderId: '1',
        groupId: '1',
    }

    const defaultValidFormState = {
        userName: true,
        email: true,
        password: true,
        phoneNumber: true,
        genderId: true,
        groupId: true,
    }

    const [formState, setFormState] = useState(defaultFormState);
    const [isValidState, setIsValidState] = useState(defaultValidFormState);
    const [isShowPassword, setIsShowPassword] = useState(false);


    useEffect(() => {
        if (props.action === 'CREATE') {
            setFormState(defaultFormState);
        }
        else if (props.action === 'EDIT') {
            let data = {
                userName: props.userData.userName,
                email: props.userData.email,
                phoneNumber: props.userData.phoneNumber,
                genderId: props.userData.gender,
                groupId: props.userData.groupId,
            }
            setFormState(data);
        }
    }, [props.action])


    const handleOnchangeInput = (value, name) => {
        let _formState = _.cloneDeep(formState);
        _formState[name] = value;
        setFormState(_formState);
    }

    const validateInput = (action) => {
        let arr = '';
        if (action === 'CREATE') {
            arr = ['userName', 'password', 'phoneNumber', 'email', 'genderId', 'groupId',]
        }
        else if (action === 'EDIT') {
            arr = ['userName', 'phoneNumber', 'email', 'genderId', 'groupId',]
        }
        let result = true;
        setIsValidState(defaultValidFormState);
        for (let i = 0; i < arr.length; i++) {
            if (!formState[arr[i]]) {
                let _isValidState = _.cloneDeep(isValidState);
                _isValidState[arr[i]] = false;
                setIsValidState(_isValidState);
                toast.warn(`Missing parameter ${arr[i]}!`)
                result = false;
                break;
            }
        }

        return result;

    }

    const handleOnclickSubmit = async (action) => {
        try {


            if (action === 'CREATE') {
                if (validateInput('CREATE') === true) {
                    let res = await createUserService(formState);
                    console.log(res);
                    if (res && res.data.EC === 0) {
                        toast.info('Create user completed!')
                        setFormState(defaultFormState);
                        props.changeOpenModalUser();
                        props.getPaginateDataFromParent();
                    }
                    else if (res && res.data.EC !== 0) {
                        toast.warn(res.data.EM);
                    }
                    else {
                        toast.warn('Error!')
                    }
                }

            }

            else if (action === 'EDIT') {
                if (validateInput('EDIT') === true) {
                    let data = {
                        ...formState, id: props.userData.id
                    }
                    let res = await editUserService(data);
                    if (res && res.data.EC === 0) {
                        toast.info('Edit user completed!')
                        setFormState(defaultFormState);
                        props.changeOpenModalUser();
                        props.getPaginateDataFromParent();
                    }
                    else if (res && res.data.EC !== 0) {
                        toast.warn(res.data.EM);
                    }
                    else {
                        toast.warn('Error!')
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <div>
            <Modal open={props.isOpenModalUser} onClose={props.changeOpenModalUser} center>
                <div className='booking-modal-container'>
                    <div className='booking-modal-content'>


                        <div className="title-container">
                            {
                                props.action !== 'EDIT' ?
                                    <div className="redux-title">Create new user</div>
                                    :
                                    <div className="redux-title">Edit user information</div>
                            }

                            {
                                props.action !== 'EDIT' ?
                                    <div className="redux-description d-none d-sm-block ">Add new user name,email,group,...</div>
                                    :
                                    <div className="redux-description d-none d-sm-block ">Adjust user name,email,group,...</div>
                            }


                        </div>

                        <div className="doctor-form px-md-5 px-sm-0">


                            <div className="doctor-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left d-none d-sm-block col-md-4">Contact infor</div>
                                    <div className="content-right col-sm-12 col-md-8">
                                        <div class="form-group d-flex gap-3 justify-content-center flex-column">

                                            <div class="form-group col-12">
                                                <label
                                                    for="inputEmail4"
                                                >Name (<span className='text-danger'>*</span>)</label>
                                                <input
                                                    className={isValidState.userName === true ? 'form-control' : 'is-invalid form-control'}
                                                    placeholder="Full name"
                                                    value={formState.userName}
                                                    onChange={(event) => handleOnchangeInput(event.target.value, 'userName')}
                                                ></input>
                                            </div>

                                            <div class="form-group col-12">
                                                <label for="inputEmail4">Password</label>
                                                {props.action === 'EDIT' ?

                                                    <input
                                                        className='form-control'
                                                        type='password'
                                                        placeholder="Your password"
                                                        value={'**********'}
                                                        disabled
                                                    >

                                                    </input>

                                                    :
                                                    <input
                                                        className={isValidState.password === true ? 'form-control' : 'is-invalid form-control'}
                                                        type='password'
                                                        placeholder="Your password"
                                                        value={formState.password}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, 'password')}
                                                    ></input>
                                                }

                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="doctor-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left d-none d-sm-block col-md-4">About</div>
                                    <div className="content-right col-sm-12 col-md-8">
                                        <div class="form-group d-flex gap-3 justify-content-center flex-column">

                                            <div class="form-group col-12">
                                                <label for="inputEmail4">Phone number (<span className='text-danger'>*</span>)</label>
                                                <input
                                                    className={isValidState.phoneNumber === true ? 'form-control' : 'is-invalid form-control'}
                                                    placeholder="Phone number"
                                                    value={formState.phoneNumber}
                                                    onChange={(event) => handleOnchangeInput(event.target.value, 'phoneNumber')}
                                                ></input>
                                            </div>



                                            <div class="form-group col-12">
                                                <label for="inputEmail4">Email (<span className='text-danger'>*</span>)</label>
                                                {props.action === 'EDIT' ?
                                                    <input
                                                        className='form-control'
                                                        placeholder="Your email (Must be included '@')"
                                                        value={formState.email}
                                                        onChange={''}
                                                        disabled
                                                    ></input>


                                                    :
                                                    <input
                                                        className={isValidState.email === true ? 'form-control' : 'is-invalid form-control'}
                                                        placeholder="Your email (Must be included '@')"
                                                        value={formState.email}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, 'email')}
                                                    ></input>

                                                }
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="doctor-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left d-none d-sm-block col-md-4">About</div>
                                    <div className="content-right col-sm-12 col-md-8">
                                        <div class="form-group d-flex gap-2 flex-row ">

                                            <div class="form-group col-6">
                                                <label for="inputEmail4">Gender </label>
                                                <select
                                                    value={formState.genderId}
                                                    onChange={(event) => handleOnchangeInput(event.target.value, 'genderId')}
                                                    className={isValidState.genderId === true ? 'form-select' : 'is-invalid form-select'}
                                                    aria-label="Default select example">
                                                    <option value="1" selected>Male</option>
                                                    <option value="2">Female</option>
                                                    <option value="3">Other</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-6">
                                                <label for="inputEmail4">Group </label>
                                                <select
                                                    value={formState.groupId}
                                                    onChange={(event) => handleOnchangeInput(event.target.value, 'groupId')}
                                                    className={isValidState.groupId === true ? 'form-select' : 'is-invalid form-select'}
                                                    aria-label="Default select example">
                                                    <option value='1' selected>Customer</option>
                                                    <option value='2' >Dev</option>
                                                    <option value='3' >Leader</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>






                            <div className="doctor-section-container">
                                {props.action === 'EDIT' ?

                                    <button
                                        onClick={() => handleOnclickSubmit('EDIT')}
                                        className={'col-12  button-edit'}>Submit</button>
                                    :
                                    <button
                                        onClick={() => handleOnclickSubmit('CREATE')}
                                        className={'col-12  button-submit'}>Create</button>

                                }

                                <p className='booking-description-policy d-none d-sm-block '>Be careful to check again your <span className='right-policy'>informations</span> after submitting to our database...</p>
                            </div>




                        </div>
                    </div>
                </div>
            </Modal >
        </div >
    );
}

export default UserModal;