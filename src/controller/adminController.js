import pool from "../config/connectDB.js";

let updateExercise = async (req, res) => {
    let exerciseId = req.params.id;
    let exercise = await pool.execute(`select * from exercise where Id = ?`, [exerciseId]);
    let info = JSON.stringify(exercise[0]);
    const obj = JSON.parse(info)
    return res.render('updateExercise.ejs', { info: obj });
}
let updateExerciseData = async (req, res) => {
    let { Id, content, detail, level, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5 } = req.body;
    console.log(Id, content, detail, level, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5);
    await pool.execute('update exercise set content = ?, detail = ?,level=?, input1 = ?, output1 = ?, input2 = ?, output2 = ?, input3 = ?, output3 = ?, input4 = ?, output4 = ?, input5 = ?, output5 = ? where Id = ?',
        [content, detail, level, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5, Id]);
    return res.redirect('/admin-exercise');
}
let adminPage = async (req, res) => {
    res.render("G:/Project-2-20222/src/view/adminCreate.ejs")
}
let adminData = async (req, res) => {
    console.log("check:", req.body)
    let { content, detail, level, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5 } = req.body;
    await pool.execute('insert into exercise(content, detail,level, input1,output1,input2,output2,input3,output3,input4,output4,input5,output5) values (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?)',
        [content, detail, level, input1, output1, input2, output2, input3, output3, input4, output4, input5, output5]);
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
    adminPage,
    adminData,
    adminLogin,
    adminExercise,
    updateExercise,
    updateExerciseData
}