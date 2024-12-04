const bcrypt = require('bcryptjs');
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';



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
            "SELECT * FROM users"
        );
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    hashPasswordService, createNewUserService, getAllUsersService, deleteUserService
}