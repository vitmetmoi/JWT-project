import React, { useState } from 'react';
import _ from 'lodash'
import './Role.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';


function Role(props) {
    const [roleWithDescription, setRoleWithDescription] = useState({
        item0: { role: '', description: '' },
    })


    const handleOnClickAddItem = () => {
        let _roleroleWithDescription = _.cloneDeep(roleWithDescription);
        let key = uuidv4();
        _roleroleWithDescription[key] = { role: '', description: '' };
        setRoleWithDescription(_roleroleWithDescription)
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

    return (
        <>
            <div className='role-container'>
                <div className='container'>
                    <h3 className='col-12 role-title text-center mt-5'>Add new role</h3>
                    <div className='col-12 role-items d-flex flex-column' >

                        {roleWithDescription && Object.keys(roleWithDescription).map((keyName, i) => (
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
                                        placeholder='URL...'></input>
                                </div>

                                <div className='col-2 d-flex flex-row justify-content-center gap-3'>
                                    <div
                                        onClick={() => handleOnClickDeleteItem(keyName)}
                                        value={keyName}
                                        className='mt-3'>
                                        <FontAwesomeIcon
                                            className='text-secondary trash'
                                            icon={faTrash}

                                        > </FontAwesomeIcon>
                                    </div>
                                    <div className='mt-3'>
                                        <FontAwesomeIcon
                                            className='text-primary trash'
                                            icon={faCirclePlus}
                                            onClick={() => handleOnClickAddItem()}
                                        ></FontAwesomeIcon>
                                    </div>



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
                        ))}


                        <div className='col-12 text-center mt-4'>
                            <button className='btn btn-primary'>Confirm</button>
                        </div>


                    </div>
                </div>
            </div >
        </>
    );
}

export default Role;