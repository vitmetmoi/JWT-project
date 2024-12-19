import db from "../models";
import _ from 'lodash'
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
            let user = await db.User.create(userData)
            if (user) {
                return {
                    DT: '',
                    EC: -1,
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
                user.gender = userData.gender;
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

module.exports = {
    getUserService, createUserService, deleteUserService, editUserService, getPaginateService
}