class chatController{
    static async chat(req,res,next){
        try {
            res.send('working')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=chatController