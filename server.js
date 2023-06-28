import express from 'express';
import compiler from 'compilex';
import { initUserRoutes, initAdminRoutes, initApiRoutes, initLoginRoutes } from './src/routes/index.js';
import configViewEngine from './src/config/viewEngine.js'


const option = { stats: true }
const app = express();
compiler.init(option)


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/codemirror-5.65.12", express.static("G:/Project-2-20222/codemirror-5.65.12"))


configViewEngine(app);
initUserRoutes(app);
initAdminRoutes(app);
initLoginRoutes(app);
initApiRoutes(app);


app.listen(8000)