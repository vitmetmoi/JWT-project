import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.post("/user/create-user", homeController.handleCreateUser)
    router.get('/user/get-all-users', homeController.handleGetAllUsers)
    router.get('/user/delete-user/:id', homeController.handleDeleteUser)
    router.get('/user', homeController.handleUserPage)
    router.post("/user/edit-user", homeController.handleEditUser)
    router.post("/user/edit-user-page/:id", homeController.handleEditUserPage)
    return app.use("/", router)
}

export default initWebRoutes;