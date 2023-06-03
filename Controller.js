const { pool } = require('./connectDB.js');

let createdata = async (req, res) => {
    console.log("check:", req.body);
    let { code, input, lang } = req.body;
    await pool.execute('insert into code(code,input,lang) values (?, ?, ?)', [code, input, lang]);
    return;
};

let savedata = async (req, res, data) => {
    console.log("check:", data);
    let data1 = data;
    await pool.execute('insert into result(result) values (?)', [data1]);
    return;
};


module.exports = {
    createdata, savedata
};
