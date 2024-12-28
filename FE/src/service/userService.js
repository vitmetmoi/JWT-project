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

// module.exports = {
//     createUserService, loginService, getUserService, getPaginateService, deleteUserService, editUserService
// }