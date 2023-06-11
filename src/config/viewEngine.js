import express from "express";

const configViewEngine = (app) => {
    app.use(express.static('./src/public', {
        setHeaders: (res, path) => {
            if (path.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
            }
        }
    }));
    app.set("view engine", "ejs");
    app.set("views", "./src/view");
}


export default configViewEngine;
