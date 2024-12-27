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
    return app.use("/api", router)
}

export default initApiRoutes;