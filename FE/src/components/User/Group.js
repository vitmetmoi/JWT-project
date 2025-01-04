import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCodeCompare, faEarthAfrica, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { getRoleService, getGroupWithRoleService, setGroupService } from '../../service/userService';
import _ from 'lodash';
import { UserContext } from '../../store/UserContext';
import './Group.scss'
function Group(props) {

    const { user, login, logout } = useContext(UserContext);
    const [roleData, setRoleData] = useState('');
    const [groupData, setGroupData] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(1);
    useEffect(() => {
        getGroupWithRole('ALL');
        getRoleData(1);
    }, [])

    const getGroupWithRole = async (groupId) => {
        let res2 = await getGroupWithRoleService(groupId);
        if (res2 && res2.data && res2.data.EC === 0) {
            let groupWithRoles = res2.data.DT;
            setGroupData(groupWithRoles);
            return groupWithRoles;
        }
    }

    const getRoleData = async (groupId) => {
        let res = await getRoleService(0, 'ALL');
        if (res && res.data && res.data.EC === 0) {
            let data = res.data.DT;
            let result = await buildDataInputSelect(data, groupId);
            setRoleData(result);
        }
    }

    const buildDataInputSelect = async (data, groupId) => {
        let result = [];
        let groupRole = await getGroupWithRole(groupId);
        let groupWithRole = groupRole && groupRole.Roles ? groupRole.Roles : '';
        if (data && groupWithRole) {
            data.map((item, index) => {

                item.isSelected = groupWithRole.some((item2) => item2.id === item.id);

                result.push(item);
            })
        }

        return result;
    }

    const handleOnClickRole = (item) => {
        let roleId = item.id;
        let _roleData = _.cloneDeep(roleData);
        _roleData.map(item => {
            if (item.id === roleId) {
                item.isSelected = !item.isSelected;
            }
            return item;
        })

        setRoleData(_roleData);
    }

    const handleOnChangeInput = (value) => {
        setSelectedGroup(value);
        getRoleData(value);
    }

    const handleOnClickSubmit = async () => {


        let arr = [];
        roleData.map((item) => {
            let obj = {};
            if (item.isSelected === true) {
                obj.groupId = selectedGroup;
                obj.roleId = item.id;
                arr.push(obj);
            }
        })
        if (!arr || arr.length <= 0) {
            arr.push({ groupId: selectedGroup, roleId: 0 })
        }
        let res = await setGroupService(arr);
        toast("Loading...", { autoClose: 1500 })
        if (res && res.data && res.data.EC === 0) {
            setTimeout(() => {
                toast.success(res.data.EM);
            }, 2000);
        }
        console.log("result arr", arr);


    }


    return (

        <>
            <div className='group-container container'>

                <div className='group-select'>
                    <label for="inputEmail4">Group </label>
                    <select
                        value={selectedGroup && selectedGroup}
                        onChange={(event) => { handleOnChangeInput(event.target.value) }}
                        className={'form-select mt-3'}
                        aria-label="Default select example">
                        <option value='1' selected>Customer</option>
                        <option value='2' >Dev</option>
                        <option value='3' >Leader</option>
                    </select>
                </div>

                <div className='list-role mt-3'>
                    {
                        roleData && roleData.length > 0 && roleData.map((item, index) => {
                            return (
                                // <div
                                //     onClick={() => handleOnClickRole(item)}
                                //     class="form-check form-switch">
                                //     <input class="form-check-input" type="checkbox" checked={item.isSelected} ></input>
                                //     <label class="form-check-label">{item.url}</label>
                                // </div>
                                <div
                                    onClick={() => handleOnClickRole(item)}
                                    class={item.isSelected ? "card text-dark bg-info   mb-3" : "card border-secondary mb-3"} >
                                    <div class="card-header">Role</div>
                                    <div class={item.isSelected ? "card-body" : "card-body text-secondary"}>
                                        <h5 class="card-title">{item.url}</h5>
                                        <p class="card-text">description: {item.description}</p>
                                    </div>
                                </div>

                            )

                        })
                    }
                </div>


                <button className='btn btn-light mt-3 submit-button'
                    onClick={() => handleOnClickSubmit()}
                ><FontAwesomeIcon icon={faDownload}></FontAwesomeIcon></button>
            </div>
        </>
    );
}

export default Group;