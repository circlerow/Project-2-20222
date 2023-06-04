const { pool } = require('./connectDB.js');

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
    const [row] = await pool.execute('select * from logindata where username = ? and password = ?', [username, password]);
    return row.length;
}
module.exports = {
    createdata, savedata, logindata
};
