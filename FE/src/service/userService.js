const axios = require('axios');

const createUserService = async (userData) => {
    return await axios.post('http://localhost:8080/api/createUser', { ...userData })
}

const loginService = async (userData) => {
    return await axios.post('http://localhost:8080/api/login', userData)
}

const getUserService = async (type, id) => {
    return await axios.get(`http://localhost:8080/api/getUser?type=${type}&id=${id}`)
}

const getPaginateService = async (currentPage, limit) => {
    return await axios.get(`http://localhost:8080/api/getPaginate?currentPage=${currentPage}&limit=${limit}`)
}

const deleteUserService = async (id) => {
    return await axios.delete(`http://localhost:8080/api/deleteUser?id=${id}`)
}

const editUserService = async (userData) => {
    return await axios.put('http://localhost:8080/api/editUser', { ...userData })
}


module.exports = {
    createUserService, loginService, getUserService, getPaginateService, deleteUserService, editUserService
}