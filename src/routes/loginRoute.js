import express from 'express';
import loginController from '../controller/loginController.js';
let router = express.Router();

const initLoginRoutes = (app) => {
    router.get("/", loginController.reset)
    router.post("/login", loginController.loginDataCheck)
    router.get("/signup", loginController.signupPage)
    router.post("/signup-user", loginController.signupData)
    return app.use('/', router);
}


export default initLoginRoutes;