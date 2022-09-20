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

//Interface definition
declare global {
    namespace Express {
        interface User {
            username: string;
            _id?: number;
        }
    }
}

app.use(function (req: express.Request, res: express.Response, next: any) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

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
app.use(passport.session())

const PORT = process.env.PORT || '8081';

app.listen(PORT,()=>{logger.info(`App up and running on port: ${PORT}`)});