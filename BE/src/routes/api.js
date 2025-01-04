import express from "express";
import homeController from "../controller/homeController"
import userController from '../controller/userController'
import JWTservice from '../middleware/JWTservice'
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initApiRoutes = (app) => {


    router.post('/register', homeController.handleRegister)
    router.post('/login', homeController.handleLogin)
    router.post('/createUser', userController.handleCreateUser)
    router.put("/editUser", userController.handleEditUser)
    router.delete('/deleteUser', userController.handleDeleteUser)
    router.get('/getUser', userController.handleGetUser)
    router.get('/getPaginate', userController.handleGetPaginate)
    router.get('/account', userController.handleGetAccount)
    router.post('/logout', userController.handleLogout)


    //Role 
    router.post('/role/add', userController.handleAddRole)
    router.get('/role/get', userController.handleGetRole)
    router.put('/role/update', userController.handleUpdateRole)
    router.delete('/role/delete', userController.handleDeleteRole)

    //Group
    router.post('/group/set', userController.handleSetGroup)
    router.get('/group/get', userController.handledGetGroupWithRole)
    return app.use("/api", router)
}

export default initApiRoutes;