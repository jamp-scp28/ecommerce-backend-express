import express from "express";
import { Router } from "express";
import * as bodyParser from 'body-parser';
import bParser, { json } from "body-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport"
import 'dotenv/config';
import cluster from "cluster";
import logger from "./utils/logger";
import indexRoutes from "./routes/index.r";
import {applyPassportStrategy} from "./utils/passport_opt";

//createProduct();

const config = require('./utils/config');

//Interface definition
declare global {
    namespace Express {
        interface User {
            username: string;
            _id?: number;
        }
    }
}

const app = express();

app.use(function (req: express.Request, res: express.Response, next: any) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));

app.use(session({
    //store: ,
    secret: process.env.SECRET_KEY!,
    resave: true,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 60000 * 10
    }
}));


applyPassportStrategy(passport);
//app.use(passport.session())

app.get('/info',(req: any, res: any)=>{
    let obj_info = {
        'Args': process.argv,
        'OS': process.platform,
        'Node Version': process.version,
        'Reserved Memory': process.memoryUsage().rss,
        'Exec Path': process.execPath,
        'Process ID': process.pid,
        'Project Folder': process.cwd(),
    }
    res.send(obj_info)
})

// Set Routes
app.use('/api/v1', indexRoutes)

const PORT = config.PORT || process.env.PORT || '8081';

app.listen(PORT,()=>{logger.info(`App up and running on port: ${config.PORT}`)});
