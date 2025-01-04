import React, { useState, useRef } from 'react';
import _ from 'lodash'
import './Role.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCodeCompare, faEarthAfrica, faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { addRoleService } from '../../service/userService';
import RoleTable from './RoleTable';
import DeleteRoleModal from './DeleteRoleModal';
import UpdateRoleModal from './UpdateRoleModal';

function Role(props) {

    const [roleWithDescription, setRoleWithDescription] = useState({
        item0: { role: '', description: '' },
    })
    const roleTableRef = useRef(null);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [selectedRole, setSelectedRole] = useState();
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
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

    const validateState = () => {
        let isValid = true;

        Object.keys(roleWithDescription).map((keyName, i) => {

            if (isValid === false) {
                return isValid;
            }
            if (!roleWithDescription[keyName].role || roleWithDescription[keyName].role === '') {
                toast('Some URL fields is missing parameter!');
                isValid = false;
                return;
            }
            if (!roleWithDescription[keyName].description || roleWithDescription[keyName].description === '') {
                toast('Some description fields is missing parameter!');
                isValid = false;
                return;
            }
        })

        return isValid;
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

    const getRoleData = () => {
        roleTableRef.current();
    }

    const handleOnClickConfrim = async () => {
        if (validateState() === true) {
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
                toast("Loading...", { autoClose: 1500 })
                if (res && res.data.EC === 0) {
                    getRoleData();
                    setTimeout(() => {
                        toast.success(res.data.EM);
                    }, 2000);

                }
                else if (res && res.data.EC === 1) {
                    setTimeout(() => {
                        toast.warn(res.data.EM);
                    }, 2000);
                }
                else {
                    toast.error('something went wrong...')
                }
            }

        }

    }

    const toggleModalDelete = (item) => {
        setSelectedRole(item);
        setIsOpenModalDelete(!isOpenModalDelete);
    }

    const toggleModalUpdate = (item) => {
        console.log('item', item);
        setSelectedRole(item);
        setIsOpenModalUpdate(!isOpenModalUpdate);
    }

    return (
        <>
            <div className='role-container'>
                <div className='container'>
                    <h3 className='col-12 role-title text-center mt-5'> <FontAwesomeIcon icon={faCodeCompare} /> Add new role</h3>
                    <div className='col-12 role-items d-flex flex-column mt-3' >

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

                        <hr className='mt-5'></hr>
                        <RoleTable
                            toggleModalDelete={toggleModalDelete}
                            toggleModalUpdate={toggleModalUpdate}
                            ref={roleTableRef}
                        ></RoleTable>
                        <DeleteRoleModal
                            getRoleData={getRoleData}
                            roleData={selectedRole}
                            isOpenModalDelete={isOpenModalDelete}
                            toggleModalDelete={toggleModalDelete}
                        ></DeleteRoleModal>

                        <UpdateRoleModal
                            getRoleData={getRoleData}
                            isOpenModalUpdate={isOpenModalUpdate}
                            toggleModalUpdate={toggleModalUpdate}
                            roleData={selectedRole}
                        ></UpdateRoleModal>

                    </div>
                </div>
            </div >
        </>
    );
}

export default Role;