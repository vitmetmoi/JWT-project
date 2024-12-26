import jwt from 'jsonwebtoken'
require('dotenv').config();

const nonSecurePaths = ['/', '/api/login', '/api/create', '/login', '/register', '/createUser', '/api/createUser', '/api/account'];

const createToken = (payload) => {

    let key = process.env.JWT_SECRET;
    try {
        var token = jwt.sign(payload, key);
        console.log('login token', token)
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
    try {


        console.log('prev path', req.path);

        if (nonSecurePaths.includes(req.path) && req.path !== '/api/account') return next();

        let cookies = req.cookies;

        let token = cookies.jwt.accessToken;

        if (token) {

            let decoded = verifyToken(token);

            if (decoded) {

                req.user = decoded;
                next();
            }
            else {
                return res.status(403).json({
                    EC: 401,
                    DT: '',
                    EM: 'You dont have permistion to access!'
                })
            }
        }
        else {
            return res.status(403).json({
                EC: 401,
                DT: '',
                EM: 'You dont have permistion to access!'
            })
        }
    }
    catch (e) {
        return res.status(403).json({
            EC: 401,
            DT: '',
            EM: 'You dont have permistion to access!'
        })
    }


}

const checkUserPermission = (req, res, next) => {
    let cookies = req.cookies;
    let path = req.path;
    console.log('cookie', cookies)

    if (nonSecurePaths.includes(req.path)) return next();

    if (cookies && cookies.jwt) {

        let token = cookies.jwt.accessToken;
        let decoded = verifyToken(token);
        if (decoded) {

            let roles = decoded.role.Roles;
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
                console.log(canAccess)
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
    createToken, verifyToken, checkUserJWT, checkUserPermission
}

