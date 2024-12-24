import jwt from 'jsonwebtoken'
require('dotenv').config();

const createToken = (payload) => {

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
    let path = req.path;

    if (cookies && cookies.jwt) {

        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {

            let roles = decoded.role;
            console.log('roles', roles);
            console.log('path', path)
            if (!roles || roles.length === 0) {
                return res.status(403).json({
                    EC: 401,
                    DT: '',
                    EM: 'You dont have permistion to access!'
                })
            }
            else {
                let canAccess = roles.some(item => { return item.url === path })

                if (canAccess === true) {
                    next();
                }
                else {
                    return res.status(403).json({
                        EC: 401,
                        DT: '',
                        EM: 'You dont have permitsion to access this resource!'
                    })
                }
            }
        }
        else {
            return res.status(401).json({
                EC: 401,
                DT: '',
                EM: 'Authenticated denined!'
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

