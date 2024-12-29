import React, { useState } from 'react';
import _ from 'lodash'
import './Role.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { addRoleService } from '../../service/userService';
function Role(props) {
    const [roleWithDescription, setRoleWithDescription] = useState({
        item0: { role: '', description: '' },
    })


    const handleOnClickAddItem = () => {
        let size = Object.keys(roleWithDescription).length;
        if (size <= 4) {
            let _roleroleWithDescription = _.cloneDeep(roleWithDescription);
            let key = uuidv4();
            _roleroleWithDescription[key] = { role: '', description: '' };
            setRoleWithDescription(_roleroleWithDescription)
        }
        else {
            toast.warn('The ammount reached limit!')
        }


    }


    const handleOnClickDeleteItem = (key) => {
        let _roleroleWithDescription = _.cloneDeep(roleWithDescription);
        delete _roleroleWithDescription[key];
        setRoleWithDescription(_roleroleWithDescription);
    }

    const handleOnChange = (name, key, value) => {
        let _roleroleWithDescription = _.cloneDeep(roleWithDescription);
        if (key === 'ROLE') {
            _roleroleWithDescription[name].role = value;

        }
        else {
            _roleroleWithDescription[name].description = value;

        }
        setRoleWithDescription(_roleroleWithDescription);
    }

    const handleOnClickConfrim = async () => {

        let data = [];
        Object.keys(roleWithDescription).map((keyName, i) => {
            let obj = {};
            obj.url = roleWithDescription[keyName].role;
            obj.description = roleWithDescription[keyName].description;
            if (obj) {
                data.push(obj)
            }
        })

        if (data && data.length > 0) {
            let res = await addRoleService(data);
            if (res && res.data.EC === 0) {

                // toast(<img className='margin-auto-img'
                //     width={'50px'} height={'50px'}
                //     src='https://cdn-icons-gif.flaticon.com/17905/17905718.gif'></img>, { autoClose: 1500 })
                toast("Loading...")

                setTimeout(() => {
                    toast.success("Save roles success!")
                }, 2000);

            }
            else {
                toast.error('something went wrong...')
            }
        }

    }

    return (
        <>
            <div className='role-container'>
                <div className='container'>
                    <h3 className='col-12 role-title text-center mt-5'>Add new role</h3>
                    <div className='col-12 role-items d-flex flex-column' >

                        {roleWithDescription && Object.keys(roleWithDescription).map((keyName, i) => {

                            return (
                                <div className='item-group col-12 d-flex flex-row px-md-5'>
                                    {/* <div className='col-1'></div> */}
                                    <div class="item col-5 input-group mb-3">
                                        <span class="input-group-text d-none d-sm-block pt-2" id="inputGroup-sizing-default">URL</span>
                                        <input
                                            onChange={(event) => handleOnChange(keyName, 'ROLE', event.target.value)}
                                            value={roleWithDescription[keyName].role}
                                            type="text"
                                            class="form-control"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default"
                                            placeholder='http://localhost:3000/...'></input>
                                    </div>

                                    <div className='col-2 d-flex flex-row justify-content-center gap-3'>
                                        {i === 0 ?
                                            <div

                                                className='mt-3'>
                                                <FontAwesomeIcon

                                                    className='text-primary trash'
                                                    icon={faCirclePlus}
                                                    onClick={() => handleOnClickAddItem()}
                                                ></FontAwesomeIcon>
                                            </div>
                                            :
                                            <div
                                                onClick={() => handleOnClickDeleteItem(keyName)}
                                                value={keyName}
                                                className='mt-3'>
                                                <FontAwesomeIcon
                                                    className='text-secondary trash'
                                                    icon={faTrash}

                                                > </FontAwesomeIcon>
                                            </div>
                                        }


                                    </div>


                                    <div class="item col-5 input-group mb-3">
                                        <span class="input-group-text d-none d-sm-block pt-2" id="inputGroup-sizing-default">Description</span>
                                        <input
                                            onChange={(event) => handleOnChange(keyName, 'DES', event.target.value)}
                                            value={roleWithDescription[keyName].description}
                                            type="text"
                                            class="form-control"
                                            aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default"
                                            placeholder='Description...'></input>
                                    </div>
                                </div>
                            )
                        })}


                        <div className='col-12 text-center mt-4'>
                            <button
                                onClick={() => handleOnClickConfrim()}
                                className='btn btn-primary'>Confirm</button>
                        </div>


                    </div>
                </div>
            </div >
        </>
    );
}

export default Role;