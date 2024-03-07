import {TokenVerifier,decodeToken} from 'jsontokens'
export function authMidelware(req,res,next){

    const authorization = req.headers.authorization
    
    if(!authorization){
        const msg = "Vous avez pas fourni de token"
        res.status(401).json({msg})
    }

    const token = authorization.split(' ')[1]
    const tokenData = decodeToken(token)
    const rawPublicKey = '03fdd57adec3d438ea237fe46b33ee1e016eda6b585c3e27ea66686c2ea5358479'
    const verified = new TokenVerifier('ES256K', rawPublicKey).verify(token)
   
    if(verified){
        next()
    }else{
        const msg = "Le token n'est pas valide"
        res.status(401).json({})
    }


}