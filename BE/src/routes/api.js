import express from "express";
import homeController from "../controller/homeController"
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */

const initApiRoutes = (app) => {
    router.post('/register', homeController.handleRegister)
    router.post('/login', homeController.handleLogin)
    return app.use("/api", router)
}

export default initApiRoutes;