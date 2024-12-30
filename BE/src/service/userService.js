import db from "../models";
import _, { orderBy } from 'lodash'
const bcrypt = require('bcryptjs');

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
        console.log(user);

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
        console.log("check user phone", user);
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

const getUserService = async (type, id) => {
    try {
        if (!type || !id) {
            return {
                DT: '',
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            let data = ''
            if (type === 'ALL') {
                data = await db.User.findAll({
                    attributes: { exclude: ['password'] },
                    include: [{ model: db.Group, attributes: ['id', 'name'] }],
                    nest: true,
                    raw: true
                })
                if (!_.isEmpty(data)) {
                    return {
                        DT: data,
                        EC: 0,
                        EM: 'Complete!'
                    }
                }
                else {
                    return {
                        DT: '',
                        EC: -1,
                        EM: 'Err from sever service!'
                    }
                }

            }
            else {
                data = await db.User.findOne({
                    where: { id: id },
                    attributes: { exclude: ['password'] },
                    include: [{ model: db.Group, attributes: ['id', 'name'] }],
                    nest: true,
                    raw: true
                })
                console.log(data);
                if (!_.isEmpty(data)) {
                    return {
                        DT: data,
                        EC: 0,
                        EM: 'Complete!'
                    }
                }
                else {
                    return {
                        DT: '',
                        EC: -1,
                        EM: 'Err from sever service!'
                    }
                }

            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

const createUserService = async (userData) => {
    try {
        if (!userData) {
            return {
                DT: '',
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            let checkEmail = await checkValidateEmailService(userData.email);
            let checkPhone = await checkValidatePhoneNumber(userData.phoneNumber);
            console.log(checkEmail)
            if (checkEmail === false) {

                console.log('test 1');
                return {
                    DT: '',
                    EC: -1,
                    EM: 'Your email is exist!'
                }
            }

            else if (checkPhone === false) {
                console.log('test 2');
                return {
                    DT: '',
                    EC: -1,
                    EM: 'Your phone number is exist!'
                }
            }
            else {
                console.log('test 3');
                let hashPassword = hashPasswordService(userData.password);

                let user = await db.User.create({
                    userName: userData.userName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    gender: userData.genderId,
                    groupId: userData.groupId,
                    password: hashPassword
                })

                if (user) {
                    return {
                        DT: '',
                        EC: 0,
                        EM: 'Completed!'
                    }
                }
                else {
                    return {
                        DT: '',
                        EC: -1,
                        EM: 'Error from sever service!'
                    }
                }

            }

        }
    }
    catch (e) {
        console.log(e);
    }
}
const deleteUserService = async (id) => {
    try {
        if (!id) {
            return {
                DT: '',
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            let user = await db.User.findOne({ where: { id: id } })
            if (user) {
                await user.destroy();
                return {
                    DT: '',
                    EC: 0,
                    EM: 'Complete!'
                }
            }
            else {
                return {
                    DT: '',
                    EC: -1,
                    EM: 'Cant find user!'
                }
            }

        }
    }
    catch (e) {
        console.log(e);
    }
}

const editUserService = async (userData) => {
    try {
        if (!userData) {
            return {
                DT: '',
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            let user = await db.User.findOne({ where: { id: userData.id } })
            if (user) {
                user.email = userData.email;
                user.userName = userData.userName;
                user.phoneNumber = userData.phoneNumber;
                user.gender = userData.genderId;
                user.groupId = userData.groupId

                await user.save();
                return {

                    DT: '',
                    EC: 0,
                    EM: 'Complete!'

                }
            }
            else {
                return {
                    DT: '',
                    EC: -1,
                    EM: 'Cant find user!'
                }
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

const getPaginateService = async (currentPage, limit) => {
    try {

        if (!currentPage || !limit) {
            return {
                DT: '',
                EC: -1,
                EM: 'Missing parameter...!'
            }
        }
        else {

            let offSet = (currentPage - 1) * limit;
            const { count, rows } = await db.User.findAndCountAll({
                attributes: { exclude: ['password'] },
                include: [{ model: db.Group, attributes: ['id', 'name'] }],
                nest: true,
                offset: offSet,
                limit: +limit,
                order: [['id', 'DESC']]
            })
            let totalPages = Math.ceil(count / limit)
            let data = {
                totalRows: count,
                totalPages: totalPages,
                users: rows
            }

            if (rows) {
                return {
                    DT: data,
                    EC: 0,
                    EM: 'Completed...!'
                }
            }
            else {
                return {
                    DT: '',
                    EC: -1,
                    EM: 'Err from sever...!'
                }
            }
        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from sever...!'
        }
    }


}

const getAccount = async (userData) => {
    try {
        if (!userData) {
            return {
                DT: '',
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {

            return {
                DT: userData,
                EC: 0,
                EM: 'Done!'
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}


const addRoleService = async (roleData) => {
    try {
        if (!roleData) {
            return {
                DT: '',
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            await db.Role.bulkCreate(roleData)
            return {
                DT: '',
                EC: 0,
                EM: 'Completed!'
            }

        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getUserService, createUserService, deleteUserService, editUserService, getPaginateService, getAccount, addRoleService
}