import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash'
import { updateRoleService } from '../../service/userService';
import { toast } from 'react-toastify';
function UpdateRoleModal(props) {

    const defaultRole = { id: '', url: '', description: '' }
    const [role, setRole] = useState(defaultRole);

    const handleOnchangeInput = (value, name) => {
        let _role = _.cloneDeep(role);
        _role[name] = value;
        setRole(_role);
    }

    const handleOnClickSubmit = async () => {
        let res = await updateRoleService(role);
        if (res && res.data && res.data.EC === 0) {
            toast.success("Update user completed!");
            props.toggleModalUpdate();
            props.getRoleData();
        }
    }

    useEffect(() => {
        if (props.roleData) {
            let id = props.roleData.id;
            let url = props.roleData.url;
            let description = props.roleData.description;
            setRole({ id, url, description });
        }
    }, [props.roleData])

    return (
        <div>
            <Modal open={props.isOpenModalUpdate} onClose={props.toggleModalUpdate} center>
                <div className='booking-modal-container'>
                    <div className='booking-modal-content'>


                        <div className="title-container">

                            <div className="redux-title">Edit user information</div>


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
                                                >URL (<span className='text-danger'>*</span>)</label>
                                                <input
                                                    className={'form-control'}
                                                    placeholder="Full name"
                                                    value={role.url}
                                                    onChange={(event) => handleOnchangeInput(event.target.value, 'url')}
                                                ></input>
                                            </div>

                                            <div class="form-group col-12">
                                                <label for="inputEmail4">Description</label>


                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder="Your password"
                                                    value={role.description}
                                                    onChange={(event) => handleOnchangeInput(event.target.value, 'description')}
                                                >

                                                </input>


                                            </div>



                                        </div>
                                    </div>
                                </div>
                                <div className='horizon-line'></div>
                            </div>



                            <div className="doctor-section-container">

                                <button
                                    onClick={() => handleOnClickSubmit()}
                                    className={'col-12  button-submit'}>Update</button>
                                <p className='booking-description-policy d-none d-sm-block '>Be careful to check again your <span className='right-policy'>informations</span> after submitting to our database...</p>
                            </div>




                        </div>
                    </div>
                </div>
            </Modal >
        </div>
    );
}

export default UpdateRoleModal;