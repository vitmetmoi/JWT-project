import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCodeCompare, faEarthAfrica, faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { getRoleService, getGroupWithRoleService } from '../../service/userService';
import _ from 'lodash';
import { UserContext } from '../../store/UserContext';
function Group(props) {

    const { user, login, logout } = useContext(UserContext);
    const [roleData, setRoleData] = useState('');
    const [groupData, setGroupData] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(1);
    useEffect(() => {
        getGroupWithRole('ALL');
        getRoleData('ALL');
    }, [])

    const getGroupWithRole = async (groupId) => {
        let res2 = await getGroupWithRoleService(groupId);
        if (res2 && res2.data && res2.data.EC === 0) {
            let groupWithRoles = res2.data.DT;
            console.log('group', groupWithRoles)
            setGroupData(groupWithRoles);
            return groupWithRoles;
        }

    }

    const getRoleData = async () => {
        let res = await getRoleService(0, 'ALL');
        if (res && res.data && res.data.EC === 0) {
            let data = res.data.DT;
            let result = await buildDataInputSelect(data);

            setRoleData(result);
        }
    }

    const buildDataInputSelect = async (data) => {
        let result = [];
        let groupRole = await getGroupWithRole('ALL');
        let groupWithRole = groupRole[0].Roles;

        if (data && groupWithRole) {
            data.map((item, index) => {

                item.isSelected = groupWithRole.some((item2) => item2.id === item.id);

                result.push(item);
            })
        }

        return result;
    }

    const handleOnClickRole = (item) => {
        console.log('item', item);
        let roleId = item.id;
        let _roleData = _.cloneDeep(roleData);
        _roleData.map(item => {
            if (item.id === roleId) {
                console.log('item2', item);
                item.isSelected = !item.isSelected;
            }
            return item;
        })

        setRoleData(_roleData);
    }

    const handleOnChangeInput = (value) => {
        setSelectedGroup(value);
    }


    return (

        <>
            <div className='group-container container'>

                <div className='group-select'>
                    <label for="inputEmail4">Group </label>
                    <select
                        value={selectedGroup && selectedGroup}
                        onChange={(event) => { handleOnChangeInput(event.target.value) }}
                        className={'form-select'}
                        aria-label="Default select example">
                        <option value='1' selected>Customer</option>
                        <option value='2' >Dev</option>
                        <option value='3' >Leader</option>
                    </select>
                </div>

                {
                    roleData && roleData.length > 0 && roleData.map((item, index) => {
                        return (
                            <div
                                onClick={() => handleOnClickRole(item)}
                                class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" checked={item.isSelected} ></input>
                                <label class="form-check-label">{item.url}</label>
                            </div>
                        )

                    })
                }

            </div>
        </>
    );
}

export default Group;