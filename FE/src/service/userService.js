import axios from '../setup/axios'

export const createUserService = (userData) => {
    return axios.post('/createUser', { ...userData })
}

export const loginService = (userData) => {
    return axios.post('/login', userData)
}

export const getUserService = (type, id) => {
    return axios.get(`/getUser?type=${type}&id=${id}`)
}

export const getPaginateService = (currentPage, limit) => {
    return axios.get(`/getPaginate?currentPage=${currentPage}&limit=${limit}`)
}

export const deleteUserService = (id) => {
    return axios.delete(`/deleteUser?id=${id}`)
}

export const editUserService = (userData) => {
    return axios.put('/editUser', { ...userData })
}
export const getUserAccountService = () => {
    return axios.get(`/account`)
}

// module.exports = {
//     createUserService, loginService, getUserService, getPaginateService, deleteUserService, editUserService
// }