import jwt from 'jsonwebtoken'
require('dotenv').config();

const createToken = () => {
    let payload = { name: 'BaoDuy' };
    let key = process.env.JWT_SECRET;
    try {
        var token = jwt.sign(payload, key);
        console.log(token)
    }
    catch (e) {
        console.log(e);
    }

    return token;
}

const verifyToken = (token, key) => {
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        if (decoded) {
            data = decoded
        }
    }
    catch (e) {
        console.log(e);
    }

    return data;

}



module.exports = {
    createToken, verifyToken
}

