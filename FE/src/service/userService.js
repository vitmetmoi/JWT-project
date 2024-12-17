const axios = require('axios');

const createUserService = async (userData) => {
    return await axios.post('http://localhost:8080/api/register', userData)
}

const loginService = async (userData) => {
    return await axios.post('http://localhost:8080/api/login', userData)
}

const getUserService = async (type, id) => {
    return await axios.get(`http://localhost:8080/api/getUser?type=${type}&id=${id}`)
}
module.exports = {
    createUserService, loginService, getUserService
}