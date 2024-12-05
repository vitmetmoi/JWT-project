
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

    await userService.deleteUserService(req.params.id)
    return res.redirect("/user");
}

const handleGetAllUsers = async (req, res) => {
    let users = await userService.getAllUsersService();
    console.log(users);
    return res.send('done')
}

const handleEditUserPage = async (req, res) => {
    // await userService.editUserService(req.params.id);
    let userData = await userService.getUserByIdService(req.params.id);
    return res.render('user-edit.ejs', { userData })
}

const handleEditUser = async (req, res) => {
    let id = req.body.id;
    let email = req.body.email;
    let userName = req.body.userName;
    let password = req.body.password;
    console.log(id);
    console.log(email);
    console.log(userName);
    console.log(password);
    await userService.editUserService(id, email, userName, password);
    return res.redirect('/user')
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateUser, handleGetAllUsers, handleDeleteUser, handleEditUser, handleEditUserPage
}