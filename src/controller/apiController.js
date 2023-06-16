import pool from "../config/connectDB.js";

let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM logindata');
    return res.status(200).json({
        message: "get all users",
        data: rows
    })
}

let getAllExercise = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM exercise');
    return res.status(200).json({
        message: "get all exercise",
        data: rows
    })
}

let getExercise = async (req, res) => {
    let exerciseId = req.params.id;
    const [rows, fields] = await pool.execute(`select * from exercise where Id = ?`, [exerciseId]);
    if (rows.length === 0) return res.status(404).json({ message: "exercise not found" })
    return res.status(200).json({
        message: "get info exercise" + exerciseId,
        data: rows
    })
}


export default {

    getAllUser, getAllExercise, getExercise
}