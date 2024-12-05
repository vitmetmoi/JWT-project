const bcrypt = require('bcryptjs');
import mysql from 'mysql2/promise';
import bluebird, { resolve } from 'bluebird';



const createConnect = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        password: "Duyngo123@",
        Promise: bluebird,
    });
    return connection;
}



let hashPasswordService = (userPassword) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userPassword, salt);

    return hash;
}

let createNewUserService = async (email, userName, password) => {
    let hashPassword = hashPasswordService(password)

    try {
        const connection = await createConnect();
        const [rows, fields] = await connection.execute(
            'INSERT INTO users (email,password,userName) VALUES (?,?,?)', [email, hashPassword, userName],
        );
    }

    catch (e) {
        console.log(e);
    }
}

let getAllUsersService = async () => {
    try {
        const connection = await createConnect();
        const [rows, fields] = await connection.execute(
            "SELECT * FROM users"
        );

        return rows;
    }
    catch (e) {
        console.log(e);
    }


}

let deleteUserService = async (id) => {
    try {
        const connection = await createConnect();
        const [rows, fields] = await connection.execute(
            "DELETE FROM users WHERE id = ?", [id]
        );
    }
    catch (e) {
        console.log(e);
    }
}

const editUserService = async (id, email, userName, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await createConnect();
            const [rows, fields] = await connection.execute(
                "UPDATE users SET email = ? , userName = ? , password = ? WHERE id = ? ", [email, userName, password, id]
            );
            console.log(rows);
            resolve()
        }
        catch (e) {
            reject(e);
        }
    })

}

const getUserByIdService = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await createConnect();
            const [rows, fields] = await connection.execute(
                "SELECT * FROM users WHERE id = ? ", [id]
            );
            resolve(rows);
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    hashPasswordService, createNewUserService, getAllUsersService, deleteUserService, getUserByIdService, editUserService
}