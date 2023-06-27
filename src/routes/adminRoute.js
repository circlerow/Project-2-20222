import express from 'express';
import adminController from '../controller/adminController.js';
let router = express.Router();

const initAdminRoutes = (app) => {
    router.get("/admin", adminController.adminLogin)
    router.get("/admin-create", adminController.adminPage)
    router.post("/create-exercise", adminController.adminData)
    router.get("/admin-exercise", adminController.adminExercise)
    router.get("/update/exercise/:id", adminController.updateExercise)
    router.post("/update-exercise", adminController.updateExerciseData)
    return app.use('/', router);
}


export default initAdminRoutes;