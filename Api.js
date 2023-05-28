const express=require("express")
const app=express()        //Khởi tạo ứng dụng 
const bodyP=require("body-parser") //body-parser dùng để lấy dữ liệu từ form
const compiler=require("compilex") //compiler dùng để compile code
const option={stats:true} //option dùng để lưu trữ các thông tin về code
const { Queue } = require('bullmq');
const { Worker } = require('bullmq');
compiler.init(option) //compiler.init dùng để khởi tạo compiler
app.use(bodyP.json())  //app.use(bodyP.json()) dùng để lấy dữ liệu từ form
app.use("/codemirror-5.65.12",express.static("G:/Web Project/Simple-Compiler/codemirror-5.65.12")) //dùng để lấy các file trong thư mục codemirror-5.65.12   
app.get("/",function (req,res){ //app.get dùng để lấy dữ liệu từ form
    compiler.flush(function () { //compiler.flush dùng để xóa các file đã compile
        console.log("deleted") //in ra màn hình console
    })
    res.sendFile("G:/Web Project/Simple-Compiler/index.html")//res.sendFile dùng để gửi file index.html
})
const myQueue = new Queue('QueueName');
app.post("/compile",function (req,res){
    var code=req.body.code //lấy code từ form
    var input=req.body.input //lấy input từ form
    var lang=req.body.lang //lấy ngôn ngữ từ form
    async function addJob() {
        const job = await myQueue.add('compile', { code: code, input: input, lang: lang });
        console.log(job.name);
    }
    addJob();

const worker = new Worker('QueueName', async job => {
    var code = job.data.code //lấy code từ form
    var input = job.data.input //lấy input từ form
    var lang = job.data.lang //lấy ngôn ngữ từ form
    if (lang == "Cpp") {
        if (!input) {//nếu không có input thì chạy hàm compiler.compileCPP
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
            compiler.compileCPP(envData, code, function (data) {
                if (data.output) {
                    res.send(data);//gửi dữ liệu về cho client
                }
                else {
                    res.send({ output: "error" })//gửi dữ liệu về cho client
                }
            });
        }
        else {//nếu có input thì chạy hàm compiler.compileCPPWithInput
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
            compiler.compileCPPWithInput(envData, code, input, function (data) {
                if (data.output) {
                    res.send(data);
                }
                else {
                    res.send({ output: "error" })
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
                }
                else {
                    res.send({ output: "error" })
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
                }
                else {
                    res.send({ output: "error" })
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
                }
                else {
                    res.send({ output: "error" })
                }
            });
        }
        else {
            var envData = { OS: "windows" };
            compiler.compilePythonWithInput(envData, code, input, function (data) {
                if (data.output) {
                    res.send(data);
                }
                else {
                    res.send({ output: "error" })
                }
            });
        }
    }
})
    worker.on('completed', (job, result) => {
        console.log(`Job ${job.id} completed with result: ${result}`);
    }
    )
    worker.on('failed', (job, err) => {
        console.log(`Job ${job.id} failed with error ${err.message}`);
    }
    )
})   

app.listen(8000)//app.listen dùng để lắng nghe cổng 8000