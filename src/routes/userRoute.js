import express from 'express';
import controller from "./../controller/Controller.js";
let router = express.Router();


const initUserRoutes = (app) => {
    router.get("/exercise", controller.getExercise)
    router.get("/detail/exercise/:id", controller.getDetailExercise)
    router.get("/index", controller.compilePage)
    router.post("/compile", controller.compilerMachine)
    router.get("/user", controller.userPage)
    return app.use('/', router);
}


export default initUserRoutes;