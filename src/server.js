import express, { response } from 'express'
import router from './router/index.js'
import errorHandler from './middlewares/errorHandler.js'
import not_found_handler from './middlewares/notfoundHandler.js'



let server = express()

let PORT = 8080
let ready = ()=>console.log('server ready on port: '+PORT)

//server.use('/public',express.static('public'))
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/',router)
server.use(errorHandler)
server.use(not_found_handler)
server.listen(PORT,ready)


