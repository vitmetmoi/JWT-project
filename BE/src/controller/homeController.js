
import userService from '../service/userService'


const handleHelloWorld = (req, res) => {
    let name = "Duy";
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateUser = (req, res) => {
    userService.createNewUserService(req.body.email, req.body.userName, req.body.password);
    return res.send("completed")
}

const handleGetAllUsers = (req, res) => {
    userService.getAllUsersService();
    return res.send("data")
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateUser, handleGetAllUsers
}