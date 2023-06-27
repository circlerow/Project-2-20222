import express from 'express';
const app = express()        //Khởi tạo ứng dụng 
import bodyP from 'body-parser';
import compiler from 'compilex';
const option = { stats: true } //option dùng để lưu trữ các thông tin về code
import initUserRoutes from './src/routes/userRoute.js';
import initAdminRoutes from './src/routes/adminRoute.js';
import initLoginRoutes from './src/routes/loginRoute.js';
import initApiRoutes from './src/routes/apiRoute.js';
import apiController from './src/controller/apiController.js';
import configViewEngine from './src/config/viewEngine.js'
import dotenv from 'dotenv';
dotenv.config();

compiler.init(option) //compiler.init dùng để khởi tạo compiler
configViewEngine(app);

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyP.json())  //app.use(bodyP.json()) dùng để lấy dữ liệu từ form
app.use("/codemirror-5.65.12", express.static("G:/Project-2-20222/codemirror-5.65.12")) //dùng để lấy các file trong thư mục codemirror-5.65.12 

initUserRoutes(app);
initAdminRoutes(app);
initLoginRoutes(app);
initApiRoutes(app);


app.listen(8000)