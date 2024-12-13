
import userService from '../service/userService'


const handleHelloWorld = (req, res) => {
    let name = "Duy";
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let users = await userService.getAllUsersService();
    return res.render("user.ejs", { users })
}

const handleCreateUser = async (req, res) => {
    await userService.createNewUserService(req.body.email, req.body.userName, req.body.password);
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
    await userService.editUserService(id, email, userName);
    return res.redirect('/user')
}

const handleRegister = async (req, res) => {
    let data = req.body;
    let result = await userService.createNewUserService(data);
    return res.status(200).json({
        data: result.data,
        errMessage: result.errMessage,
        errCode: result.errCode
    })
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateUser,
    handleGetAllUsers, handleDeleteUser, handleEditUser, handleEditUserPage,
    handleRegister
}