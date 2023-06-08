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
app.use("/login.css", express.static("G:/Project-2-20222/login.css")) //dùng để lấy các file trong thư mục css
app.use("/controller.js", express.static("G:/Project-2-20222/controller.js")) //dùng để lấy các file trong thư mục css
app.use("/login.js", express.static("G:/Project-2-20222/login.js")) //dùng để lấy các file trong thư mục css
app.get("/", function (req, res) { //app.get dùng để lấy dữ liệu từ form
    compiler.flush(function () { //compiler.flush dùng để xóa các file đã compile
        console.log("deleted") //in ra màn hình console
    })
    // res.sendFile("G:/Project-2-20222/index.html")//res.sendFile dùng để gửi file index.html
    res.sendFile("G:/Project-2-20222/src/view/login.html")
})
app.post("/login", async (req, res) => {
    console.log("check:", req.body)
    const rowCount = await controller.logindata(req.body.username, req.body.password)
    console.log("checkrow:", rowCount)
    if (rowCount > 0) {
        res.send({ status: "success" })
    }
    else {
        res.send({ status: "fail" })
    }

})

app.get("/index", (req, res) => {
    res.sendFile("G:/Project-2-20222/src/view/index.html")
})

app.post("/compile", async (req, res) => {
    var code = req.body.code //lấy code từ form
    var input = req.body.input //lấy input từ form
    var lang = req.body.lang //lấy ngôn ngữ từ form
    await controller.createdata(req);
    try {

        if (lang == "Cpp") {
            if (!input) {//nếu không có input thì chạy hàm compiler.compileCPP
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, (data) => {
                    if (data.output) {
                        res.send(data);//gửi dữ liệu về cho client
                        controller.savedata(data)
                    }
                    else {
                        res.send({ output: "error" })//gửi dữ liệu về cho client
                    }
                });
            }
            else {//nếu có input thì chạy hàm compiler.compileCPPWithInput
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, async (data) => {
                    if (data.output) {
                        res.send(data);
                        controller.savedata(data);
                    }
                    else {
                        res.send({ output: "error" })
                        controller.savedata({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                        controller.savedata(data)
                    }
                    else {
                        res.send({ output: "error" })
                        controller.savedata({ output: "error" })

                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                        controller.savedata(data)

                    }
                    else {
                        res.send({ output: "error" })
                        controller.savedata({ output: "error" })

                    }
                })
            }
        }
        else if (lang == "python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                        controller.savedata(data)

                    }
                    else {
                        res.send({ output: "error" })
                        controller.savedata({ output: "error" })

                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                        controller.savedata(data)
                    }
                    else {
                        res.send({ output: "error" })
                        controller.savedata({ output: "error" })

                    }
                });
            }
        }
    }
    catch (e) {//bắt lỗi
        console.log("error")//console.log dùng để in ra màn hình console
    }

})

app.listen(8000)//app.listen dùng để lắng nghe cổng 8000