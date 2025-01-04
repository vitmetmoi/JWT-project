const bcrypt = require('bcryptjs');
import mysql, { raw } from 'mysql2/promise';
import bluebird, { reject, resolve } from 'bluebird';
import db from '../models/index'
import { Op } from 'sequelize';
import JWTservice from '../middleware/JWTservice'
require('dotenv').config();

let hashPasswordService = (userPassword) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userPassword, salt);

    return hash;
}

const checkValidateEmailService = async (email) => {
    try {
        let user = await db.User.findOne({
            where: { email: email },
            raw: true
        });
        if (user) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (e) {
        console.log(e);
    }

}

const checkValidatePhoneNumber = async (phoneNumber) => {
    try {
        let user = await db.User.findOne({
            where: { phoneNumber: phoneNumber },
            raw: true

        });
        if (user) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (e) {
        console.log(e);
    }
}

let createNewUserService = async (userData) => {
    try {
        let emailIsValid = await checkValidateEmailService(userData.email);
        let phoneNumberIsValid = await checkValidatePhoneNumber(userData.phoneNumber);
        if (emailIsValid === false) {

            return {
                DT: "email",
                EC: -1,
                EM: "Email has already exits"
            }
        }
        else if (phoneNumberIsValid === false) {
            return {
                DT: 'phoneNumber',
                EC: -1,
                EM: "PhoneNumber has already exits"
            }
        }
        else {
            let hashPassword = hashPasswordService(userData.password);
            await db.User.create({
                email: userData.email,
                userName: userData.userName,
                phoneNumber: userData.phoneNumber,
                password: hashPassword
            })
            return {
                DT: '',
                EC: 0,
                EM: "Done"
            }
        }
    }

    catch (e) {
        console.log(e);
    }
}

const findGroupWithRole = async (user, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (user) {
                let groupId = user.groupId;


                let groupRoles = await db.Group.findOne({
                    include: [{
                        model: db.Role,
                        attributes: ['id', 'url', 'description'],
                        through: {}
                    }]
                })

                if (groupRoles) {
                    resolve(groupRoles);
                }

            }
        }

        catch (e) {
            reject(e);
        }

    })



}

const loginUserService = async (userData) => {
    try {

        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ email: userData.loginValue }, { phoneNumber: userData.loginValue }]
            }
        })

        if (user) {
            let roles = await findGroupWithRole(user);
            let result = bcrypt.compareSync(userData.password, user.password);

            if (result === true) {
                let payload = {
                    userName: user.userName,
                    email: user.email,
                    role: roles,
                }
                let access_token = JWTservice.createToken(payload);
                let decoded = JWTservice.verifyToken(access_token);
                return {
                    DT: {
                        email: user.email,
                        userName: user.userName,
                        accessToken: access_token,
                        groupWithRoles: payload.role,
                        iat: decoded.iat,
                        exp: decoded.exp
                    },
                    EC: 0,
                    EM: "Done"
                }
            }
            else {
                return {
                    DT: '',
                    EC: -1,
                    EM: "Your password is incorrect!"
                }
            }

        }
        else {
            return {
                DT: '',
                EC: -1,
                EM: "Your email or phone number is incorrect!"
            }
        }


    } catch (error) {
        console.log(error);
    }
}

let getAllUsersService = async () => {
    try {
        let users = await db.User.findAll({
            include: [{ model: db.Group }],
            raw: true,
            nest: true
        });

        let groups = await db.Group.findAll({
            include: [{ model: db.Role }],
            raw: true,
            nest: true
        })
        let roles = await db.Role.findAll({
            raw: true,
            nest: true
        })

        // console.log("checkk users", users);
        return users;
    }

    catch (e) {
        console.log(e);
    }


}

let deleteUserService = async (id) => {
    try {
        let user = await db.User.findOne(
            {
                where: { id: id }
            }
        )

        await user.destroy();
    }
    catch (e) {
        console.log(e);
    }
}

const editUserService = async (id, email, userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(
                { email: email, userName: userName },
                {
                    where: { id: id }
                }

            );
            resolve();
        }
        catch (e) {
            reject(e);
        }
    })

}

const getUserByIdService = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: true
            })
            console.log(user);
            resolve(user);
        }
        catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    hashPasswordService, createNewUserService,
    getAllUsersService, deleteUserService, getUserByIdService, editUserService, loginUserService
}