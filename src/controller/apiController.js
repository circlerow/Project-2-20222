import pool from "../config/connectDB.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

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

let login = async (req, res) => {
    const username = req.body.username;
    JSON.stringify(username);
    console.log("check INPUT:", username);
    const password = req.body.password;
    console.log("check INPUT:", username, password);
    const [row] = await pool.execute('select * from logindata where username = ? and password = ?', [username, password]);
    if (row.length === 0) return res.status(404).json({ message: "user not found" })
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
}


export default {

    getAllUser, getAllExercise, getExercise, login
}