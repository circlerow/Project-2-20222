import pool from "../config/connectDB.js";
import compiler from 'compilex';

let logindata = async (username, password) => {
    console.log("check INPUT:", username, password);
    const [row] = await pool.execute('select * from logindata where username = ? and password = ?', [username, password]);
    console.log("check:", row.length)
    return row.length;
}
let reset = async (req, res) => {
    {
        compiler.flush(function () {
            console.log("deleted")
        })
        res.render("G:/Project-2-20222/src/view/login.ejs")
    }
}

let loginDataCheck = async (req, res) => {
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

let signupPage = async (req, res) => {
    return res.render('signup.ejs');
}

let signupData = async (req, res) => {
    console.log("check:", req.body)
    let { name, username, password } = req.body;
    await pool.execute('insert into logindata(username,password,name) values (?, ?, ?)', [username, password, name]);
    return res.redirect('/');
}

export default {
    loginDataCheck,
    reset,
    signupPage,
    signupData
}
