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
import connectRedis from 'connect-redis'
import { createClient } from 'redis'
import * as http from "http"
import * as socketio from "socket.io"
import { chatDao } from './database/chat.dao'

const chatDB = new chatDao()

const RedisStore = connectRedis(session)
const redisClient = createClient()
const app = express()

app.set('view engine', 'ejs');

/* GET api/ */
app.get('/chat', (req: express.Request, res: express.Response)=>{
    res.render('pages/index',{});
})

app.get('/chat/:email', async (req: express.Request, res: express.Response)=>{
    const email: string = req.params.email
    chatDB.getChatByEmail(email).then((data)=>{
        if(data){
            console.log(data)
            return res.render('pages/userChat',{messages: data})
        }
        return res.render('pages/userChat',{messages:[]})
    })
})

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
    store: new RedisStore({client: redisClient, disableTouch: true}),
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

//app.listen(PORT,()=>{logger.info(`App up and running on port: ${PORT}`)})

const server = http.createServer(app);
const io = new socketio.Server(server);

io.on('connection', async (socket) =>{

    const messages = await chatDB.getChats()
    socket.emit('messages', messages);

    socket.on('message', async data => {
        console.log(data)
        chatDB.createChat(data)
        io.sockets.emit('messages',await chatDB.getChats());
    })
})

server.listen(PORT, () => {
  console.log("Running at localhost:8081");
})