import * as bodyParser from 'body-parser'
import 'dotenv/config'
import express from "express"
import session from "express-session"
import passport from "passport"
import routes from "./rest/routes/index.route"
import { applyPassportStrategy } from "./rest/utils/config/passport_opt"
import logger from "./rest/utils/logger/logger"
import swagerUi from 'swagger-ui-express'
import {options} from './rest/utils/swager'
import SwaggerJsdoc from 'swagger-jsdoc'

const app = express()
app.use('/api-docs', swagerUi.serve, swagerUi.setup(SwaggerJsdoc(options)))

app.use(function (req: express.Request, res: express.Response, next: any) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1',routes)

app.get('/', (req: express.Request, res: express.Response)=>{
    console.log('redirect')
    res.redirect('/api/v1/auth/login')
});

app.use(express.static("public"))

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
}))

applyPassportStrategy(passport);
app.use(passport.session())

const PORT = process.env.PORT || '8081'

app.listen(PORT,()=>{logger.info(`App up and running on port: ${PORT}`)})