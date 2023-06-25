import express from 'express';
const app = express()        //Khởi tạo ứng dụng 
import bodyP from 'body-parser';
import compiler from 'compilex';
const option = { stats: true } //option dùng để lưu trữ các thông tin về code
import controller from "./src/controller/Controller.js";
import loginController from './src/controller/loginController.js';
import adminController from './src/controller/adminController.js';
import apiController from './src/controller/apiController.js';
import configViewEngine from './src/config/viewEngine.js'
import apiMiddleware from './src/middleware/apiMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

compiler.init(option) //compiler.init dùng để khởi tạo compiler
configViewEngine(app);

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyP.json())  //app.use(bodyP.json()) dùng để lấy dữ liệu từ form
app.use("/codemirror-5.65.12", express.static("G:/Project-2-20222/codemirror-5.65.12")) //dùng để lấy các file trong thư mục codemirror-5.65.12 


//USER
app.get("/exercise", controller.getExercise)
app.get("/detail/exercise/:id", controller.getDetailExercise)
app.get("/index", controller.compilePage)
app.post("/compile", controller.compilerMachine)
app.get("/user", controller.userPage)

//ADMIN
app.get("/admin", adminController.adminLogin)
app.get("/admin-create", adminController.adminPage)
app.post("/create-exercise", adminController.adminData)
app.get("/admin-exercise", adminController.adminExercise)
app.get("/update/exercise/:id", adminController.updateExercise)
app.post("/update-exercise", adminController.updateExerciseData)


//LOGIN
app.get("/", loginController.reset)
app.post("/login", loginController.loginDataCheck)
app.get("/signup", loginController.signupPage)
app.post("/signup-user", loginController.signupData)

//API
app.get("/user-api", apiController.getAllUser)
app.get("/exercise-api", apiController.getAllExercise)
app.get("/exercise-api/:id", apiController.getExercise)
app.post("/logins", apiController.login)
app.get('/check-login', apiMiddleware.authenticateToken, apiController.checkLogin)
app.get("/token", apiController.token)
app.delete("/logout", apiController.logout)



app.listen(8000)