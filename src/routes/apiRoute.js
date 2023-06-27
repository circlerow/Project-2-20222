import express from 'express';
import apiController from '../controller/apiController.js';
let router = express.Router();
import apiMiddleware from '../middleware/apiMiddleware.js';

const initApiRoutes = (app) => {
    router.get("/user-api", apiController.getAllUser)
    router.get("/exercise-api", apiController.getAllExercise)
    router.get("/exercise-api/:id", apiController.getExercise)
    router.post("/logins", apiController.login)
    router.get('/check-login', apiMiddleware.authenticateToken, apiController.checkLogin)
    router.get("/token", apiController.token)
    router.delete("/logout", apiController.logout)
    return app.use('/', router);
}


export default initApiRoutes;