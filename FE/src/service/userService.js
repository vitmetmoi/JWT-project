import axios from '../setup/axios'

export const createUserService = (userData) => {
    return axios.post('/api/createUser', { ...userData })
}

export const loginService = (userData) => {
    return axios.post('/api/login', userData)
}

export const getUserService = (type, id) => {
    return axios.get(`/api/getUser?type=${type}&id=${id}`)
}

export const getPaginateService = (currentPage, limit) => {
    return axios.get(`/api/getPaginate?currentPage=${currentPage}&limit=${limit}`)
}

export const deleteUserService = (id) => {
    return axios.delete(`/api/deleteUser?id=${id}`)
}

export const editUserService = (userData) => {
    return axios.put('/api/editUser', { ...userData })
}
export const getUserAccountService = () => {
    return axios.get(`/api/account`)
}

export const logoutService = () => {
    return axios.post(`/api/logout`)
}
export const addRoleService = (data) => {
    return axios.post(`/api/role/add`, data)
}

export const getRoleService = (currentPage, limit) => {
    return axios.get(`/api/role/get?currentPage=${currentPage}&limit=${limit}`)
}

export const deleteRoleService = (roleId) => {
    return axios.delete(`/api/role/delete?roleId=${roleId}`)
}

export const updateRoleService = (roleData) => {
    return axios.put(`/api/role/update`, roleData)
}

export const getGroupWithRoleService = (groupId) => {
    return axios.get(`/api/group/get?groupId=${groupId}`)
}

export const setGroupService = (data) => {
    return axios.post(`/api/group/set`, data)
}

// module.exports = {
//     createUserService, loginService, getUserService, getPaginateService, deleteUserService, editUserService
// }