const axios = require('axios');

const createUserService = (userData) => {
    return axios.post('http://localhost:8080/api/register', userData)
}

module.exports = {
    createUserService
}