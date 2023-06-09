import pool from "../config/connectDB.js";


let createdata = async (req, res) => {
    console.log("check INPUT:", req.body);
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

let getExample = async (req, res) => {


    const [rows, fields] = await pool.execute('SELECT * FROM example');


    return res.render('example.ejs', { dataExample: rows });
}

let getDetailExample = async (req, res) => {
    let exampleId = req.params.id;
    let example = await pool.execute(`select * from example where Id = ?`, [exampleId]);
    let info = JSON.stringify(example[0]);
    const obj = JSON.parse(info)
    console.log("check:", obj[0].Id)
    return res.render('exampleDetail.ejs', { info: obj });
}

export default {
    createdata, savedata, logindata, getExample, getDetailExample
};
