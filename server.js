import express from 'express';
const app = express()        //Khởi tạo ứng dụng 
import bodyP from 'body-parser';
import compiler from 'compilex';
const option = { stats: true } //option dùng để lưu trữ các thông tin về code
import controller from "./src/controller/Controller.js";
import configViewEngine from './src/config/viewEngine.js'

compiler.init(option) //compiler.init dùng để khởi tạo compiler
configViewEngine(app);

app.use(bodyP.json())  //app.use(bodyP.json()) dùng để lấy dữ liệu từ form
app.use("/codemirror-5.65.12", express.static("G:/Project-2-20222/codemirror-5.65.12")) //dùng để lấy các file trong thư mục codemirror-5.65.12   
app.get("/", controller.reset)
app.get("/example", controller.getExample)
app.get("/detail/example/:id", controller.getDetailExample)
app.post("/login", controller.loginDataCheck)
app.get("/index", controller.compilePage)
app.post("/compile", controller.compilerMachine)


app.listen(8000)