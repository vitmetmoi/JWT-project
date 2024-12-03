import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Duyngo123@",
    database: 'jwt',
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected!:)');
    }
});


const handleHelloWorld = (req, res) => {
    let name = "Duy";
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateUser = (req, res) => {

    console.log(req.body);

    connection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            console.log(results);
        }

    );


    return res.send("completed")
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateUser
}