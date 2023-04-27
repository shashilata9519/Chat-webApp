const {Router}=require('express');
const chatController = require('../Controller/chatController');

class chatRouter{
    router;
    constructor(){
        this.router=Router()
        this.getRouter()
    }

    getRouter(){
        this.router.get('/',chatController.chat)
    }

}

module.exports=new chatRouter().router