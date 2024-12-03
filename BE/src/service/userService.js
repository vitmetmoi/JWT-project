const bcrypt = require('bcryptjs');
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    password: "Duyngo123@"
});

let hashPasswordService = (userPassword) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userPassword, salt);

    return hash;
}

let createNewUserService = (email, userName, password) => {
    let hashPassword = hashPasswordService(password)

    connection.query(
        'INSERT INTO users (email,password,userName) VALUES (?,?,?)', [email, hashPassword, userName],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        }
    );
}

let getAllUsersService = () => {
    connection.query(
        "SELECT * FROM users",
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(results)
            }
        }
    )


}

module.exports = {
    hashPasswordService, createNewUserService, getAllUsersService
}