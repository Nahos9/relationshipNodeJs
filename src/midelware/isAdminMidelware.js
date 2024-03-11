import {decodeToken} from 'jsontokens'
export function isAdminMidelware(req,res,next){
    const authorization = req.headers.authorization
    if(!authorization){
        const msg = "Vous n'avez pas fourni de token"
        res.status(401).json({msg})
    }
    const token = authorization.split(' ')[1]
    const tokenData = decodeToken(token)
    const role = tokenData.payload.role
    if(role === "admin"){
        console.log(role)
        next()
    }else{
        const msg = "Vous n'avez pas le droit d'acceder à cette ressource"
       res.status(403).json({msg})
    }

}