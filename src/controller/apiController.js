import pool from "../config/connectDB.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
let refreshTokens = []

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
    const password = req.body.password;
    console.log("check INPUT:", username, password);
    const [row] = await pool.execute('select * from logindata where username = ? and password = ?', [username, password]);
    if (row.length === 0) return res.status(404).json({ message: "user not found" })
    const user = { name: username }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

let checkLogin = async (req, res) => {
    const [row] = await pool.execute('select * from logindata');
    res.json(row.filter(post => post.username === req.user.name))
}
let token = async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
}

export default {

    getAllUser, getAllExercise, getExercise, login, checkLogin, token
}