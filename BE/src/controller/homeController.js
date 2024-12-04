
import userService from '../service/userService'


const handleHelloWorld = (req, res) => {
    let name = "Duy";
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let users = await userService.getAllUsersService();
    return res.render("user.ejs", { users })
}

const handleCreateUser = (req, res) => {
    userService.createNewUserService(req.body.email, req.body.userName, req.body.password);
    return res.redirect("/user")
}

const handleDeleteUser = async (req, res) => {
    console.log('check req', req.params.id);
    // await userService.deleteUserService(req.params.id)
    return res.send('done');
    return res.redirect("/user");
}

const handleGetAllUsers = async (req, res) => {
    let users = await userService.getAllUsersService();
    console.log(users);
    return res.send('done')
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateUser, handleGetAllUsers, handleDeleteUser
}