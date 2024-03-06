import { userModel } from "../models/userModel.js"

export function createUser(app){
    app.post('/api/signup',(req,res)=>{
        userModel.create()
    })
}