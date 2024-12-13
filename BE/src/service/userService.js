const bcrypt = require('bcryptjs');
import mysql from 'mysql2/promise';
import bluebird, { resolve } from 'bluebird';
import db from '../models/index'





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
                data: "email",
                errCode: -1,
                errMessage: "Email has already exits"
            }
        }
        else if (phoneNumberIsValid === false) {
            return {
                data: 'phoneNumber',
                errCode: -1,
                errMessage: "PhoneNumber has already exits"
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
                data: '',
                errCode: 0,
                errMessage: "Done"
            }
        }
    }

    catch (e) {
        console.log(e);
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
        console.log("checkk users", roles);
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
    hashPasswordService, createNewUserService, getAllUsersService, deleteUserService, getUserByIdService, editUserService
}