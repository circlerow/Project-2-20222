import express from "express";

const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
    app.set("view engine", "ejs");
    app.set("views", "./src/view");
}

export default configViewEngine;
