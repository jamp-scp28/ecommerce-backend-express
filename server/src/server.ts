<<<<<<< HEAD
import * as bodyParser from 'body-parser'
import 'dotenv/config'
import express from "express"
import session from "express-session"
import passport from "passport"
import promclient from "prom-client"
import routes from "./rest/routes/index.route"
import { applyPassportStrategy } from "./rest/utils/config/passport_opt"
import logger from "./rest/utils/logger/logger"

const app = express()

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type',  promclient.register.contentType);
    res.send(promclient.register.metrics());
});
=======
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
import productRoutes from "./routes/products.r";
import authRoutes from "./routes/auth.r";
import {applyPassportStrategy} from "./store/passport_opt";

//createProduct();

const config = require('./utils/config');
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005

//Interface definition
declare global {
    namespace Express {
        interface User {
            username: string;
            _id?: number;
        }
    }
}

<<<<<<< HEAD
app.use(function (req: express.Request, res: express.Response, next: any) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
=======
const app = express();

app.use(function (req: express.Request, res: express.Response, next: any) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

<<<<<<< HEAD
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/v1',routes);

app.get('/', (req: express.Request, res: express.Response)=>{
    console.log('redirect')
    res.redirect('/api/v1/auth/login')
});

app.get('/info',(req: express.Request, res: express.Response)=>{
    let obj_info = {
        'Args': process.argv,
        'OS': process.platform,
        'Node Version': process.version,
        'Reserved Memory': process.memoryUsage().rss,
        'Exec Path': process.execPath,
        'Process ID': process.pid,
        'Project Folder': process.cwd(),
    }
})

app.use(express.static("public"));

=======
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));

>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
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

<<<<<<< HEAD
applyPassportStrategy(passport);
app.use(passport.session())

const PORT = process.env.PORT || '8081';

app.listen(PORT,()=>{logger.info(`App up and running on port: ${PORT}`)});
=======

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
app.use('/api/v1/products', productRoutes)
app.use("/api/v1/auth", authRoutes)

const PORT = config.PORT || process.env.PORT || '8081';

app.listen(PORT,()=>{logger.info(`App up and running on port: ${config.PORT}`)});
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
