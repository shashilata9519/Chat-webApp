const bodyParser = require('body-parser')
const express=require('express')
const cors=require('cors')
const { default: mongoose } = require('mongoose')
const chatRouter = require('./Router/chatRouter')
const http =require('http')
const io=require('socket.io')

class Server{
    app=express()
    // socket=io(http).createServer(this.app)
    constructor(){
        this.setConfiguration()
        this.setRouter()
    }

    setRouter(){
        this.app.use('/',chatRouter)
    }

    setConfiguration(){
        this.configBodyParse()
        this.connectMongoDB()
        // this.socketIO()
    }

    // socketIO(){
    //     this.socket.on('connection', (socket) => {
    //       console.log(`User connected ${socket.id}`);
    //     });
    // }

    configBodyParse(){
        this.app.use(bodyParser.json())
        this.app.use(cors())
    }

    async connectMongoDB(){
        try {
            const status = await mongoose.connect(
                'mongodb+srv://chat-app:chat-app@cluster0.uyh4sfz.mongodb.net/?retryWrites=true&w=majority'
            , { useNewUrlParser: true, useUnifiedTopology: true })
            if(status){
                console.log('database connected')
            }
            
        } catch (error) {
            console.log(error)
        } 
    }
}

module.exports=Server