const axios = require('axios');

const createUserService = async (userData) => {
    return await axios.post('http://localhost:8080/api/register', userData)
}

const loginService = async (userData) => {
    return await axios.post('http://localhost:8080/api/login', userData)
}
module.exports = {
    createUserService, loginService
}