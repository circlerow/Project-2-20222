import pool from "../config/connectDB.js";
import compiler from 'compilex';


let createdata = async (req, res) => {
    let { code, input, lang } = req.body;
    await pool.execute('insert into code(code,input,lang) values (?, ?, ?)', [code, input, lang]);
    return;
};

let savedata = async (data) => {
    console.log("check OUTPUT:", data);
    let data1 = data.output;
    console.log("check:", data1)
    await pool.execute('insert into result(result) values (?)', [data1]);
    return;
};

let logindata = async (username, password) => {
    console.log("check INPUT:", username, password);
    const [row] = await pool.execute('select * from logindata where username = ? and password = ?', [username, password]);
    console.log("check:", row.length)
    return row.length;
}

let getExercise = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM exercise');
    return res.render('exercise.ejs', { dataExercise: rows });
}

let getDetailExercise = async (req, res) => {
    let exerciseId = req.params.id;
    let exercise = await pool.execute(`select * from exercise where Id = ?`, [exerciseId]);
    let info = JSON.stringify(exercise[0]);
    const obj = JSON.parse(info)
    return res.render('exerciseDetail.ejs', { info: obj });
}


let updateExercise = async (req, res) => {
    let exerciseId = req.params.id;
    let exercise = await pool.execute(`select * from exercise where Id = ?`, [exerciseId]);
    let info = JSON.stringify(exercise[0]);
    const obj = JSON.parse(info)
    return res.render('updateExercise.ejs', { info: obj });
}

let updateExerciseData = async (req, res) => {
    let { Id, content, detail, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5 } = req.body;
    console.log(Id, content, detail, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5);
    await pool.execute('update exercise set content = ?, detail = ?, input1 = ?, output1 = ?, input2 = ?, output2 = ?, input3 = ?, output3 = ?, input4 = ?, output4 = ?, input5 = ?, output5 = ? where Id = ?', [content, detail, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5, Id]);
    return res.redirect('/admin-exercise');
}

let userPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM logindata');
    res.render("G:/Project-2-20222/src/view/user.ejs", { user: rows })
}

let compilerMachine = async (req, res) => {
    var code = req.body.code //lấy code từ form
    var input = req.body.input //lấy input từ form
    var lang = req.body.lang //lấy ngôn ngữ từ form
    await createdata(req);
    try {
        if (lang == "Cpp") {
            if (!input) {//nếu không có input thì chạy hàm compiler.compileCPP
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, (data) => {
                    if (data.output) {
                        res.send(data);//gửi dữ liệu về cho client
                        savedata(data)
                    }
                    else {
                        res.send({ output: "error" })//gửi dữ liệu về cho client
                        savedata({ output: "error" })
                    }
                });
            }
            else {//nếu có input thì chạy hàm compiler.compileCPPWithInput
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, async (data) => {
                    if (data.output) {
                        res.send(data);
                        savedata(data);
                    }
                    else {
                        res.send({ output: "error" })
                        savedata({ output: "error" })
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
                        savedata(data)
                    }
                    else {
                        res.send({ output: "error" })
                        savedata({ output: "error" })

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
                        savedata(data)

                    }
                    else {
                        res.send({ output: "error" })
                        savedata({ output: "error" })

                    }
                })
            }
        }
        else if (lang == "python") {
            if (!input) {
                console.log("check:", code, input, lang)
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                        savedata(data)

                    }
                    else {
                        res.send({ output: "error" })
                        savedata({ output: "error" })

                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                        savedata(data)
                    }
                    else {
                        res.send({ output: "error" })
                        savedata({ output: "error" })

                    }
                });
            }
        }
    }
    catch (e) {//bắt lỗi
        console.log("error")//console.log dùng để in ra màn hình console
    }
}
let compilePage = (req, res) => {
    res.render("G:/Project-2-20222/src/view/index.ejs")
}
let loginDataCheck = async (req, res) => {
    console.log("check:", req.body)
    const rowCount = await logindata(req.body.username, req.body.password)
    console.log("checkrow:", rowCount)
    console.log("check:", req.body.username, req.body.password)
    let { username, password } = req.body;
    if (username == "admin" && password == "1") {
        res.send({ status: "admin" })
    }
    else if (rowCount > 0) {
        res.send({ status: "success" })
    }
    else {
        res.send({ status: "fail" })
    }
}
let reset = async (req, res) => {
    {
        compiler.flush(function () {
            console.log("deleted")
        })
        res.render("G:/Project-2-20222/src/view/login.ejs")
    }
}

let signupPage = async (req, res) => {
    return res.render('signup.ejs');
}

let signupData = async (req, res) => {
    console.log("check:", req.body)
    let { name, username, password } = req.body;
    await pool.execute('insert into logindata(username,password,name) values (?, ?, ?)', [username, password, name]);
    return res.redirect('/');
}

let adminPage = async (req, res) => {
    res.render("G:/Project-2-20222/src/view/adminCreate.ejs")
}
let adminData = async (req, res) => {
    console.log("check:", req.body)
    let { content, detail, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5 } = req.body;
    await pool.execute('insert into exercise(content, detail, input1,output1,input2,output2,input3,output3,input4,output4,input5,output5) values (?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?)', [content, detail, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5]);
    return res.redirect('/admin');
}
let adminLogin = async (req, res) => {
    res.render("G:/Project-2-20222/src/view/admin.ejs")
}
let adminExercise = async (req, res) => {
    const [rows, fields] = await pool.execute('select * from exercise');
    res.render("G:/Project-2-20222/src/view/exerciseAdmin.ejs", { dataExercise: rows })
}


export default {
    createdata, savedata, logindata, getExercise, getDetailExercise,
    compilerMachine, compilePage, loginDataCheck, reset, signupPage,
    signupData, adminPage, adminData, userPage, adminLogin, adminExercise,
    updateExercise, updateExerciseData
};
