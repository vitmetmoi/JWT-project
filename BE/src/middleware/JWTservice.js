import jwt from 'jsonwebtoken'
require('dotenv').config();

const createToken = (data) => {
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

const verifyToken = (token) => {
    let data = null;
    let key = process.env.JWT_SECRET
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

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;

    if (cookies && cookies.jwt) {
        console.log('my jwt', cookies.jwt);
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            next();
        }
        else {
            return res.status(401).json({
                EC: 401,
                DT: '',
                EM: 'Authenticated denine!'
            })
        }
    }


    else {
        return res.status(401).json({
            EC: 401,
            DT: '',
            EM: 'Authenticated denine!'
        })
    }
}



module.exports = {
    createToken, verifyToken, checkUserJWT
}

