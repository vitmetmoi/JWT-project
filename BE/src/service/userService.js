const bcrypt = require('bcryptjs');
import mysql from 'mysql2/promise';
import bluebird, { resolve } from 'bluebird';
import db from '../models/index'





let hashPasswordService = (userPassword) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userPassword, salt);

    return hash;
}

let createNewUserService = async (email, userName, password) => {
    let hashPassword = hashPasswordService(password)

    try {
        await db.User.create({
            email: email,
            userName: userName,
            password: hashPassword
        })
    }

    catch (e) {
        console.log(e);
    }
}

let getAllUsersService = async () => {
    try {
        let users = await db.User.findAll();
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