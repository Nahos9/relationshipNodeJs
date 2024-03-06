import { UniqueConstraintError, ValidationError } from "sequelize"
import { Role, User } from "../../confiDB.js"
import bcrypt from 'bcrypt'
import {TokenSigner} from 'jsontokens'

export  function inscription(app){
    app.post('/api/signup',async (req,res)=>{
        await Role.findOne({where: req.body.role_id})
        .then(role=>{
            if(role){
                bcrypt.hash(req.body.password,10)
                .then(passwordEncypt=>{
                    if(passwordEncypt){
                        User.create({
                            email: req.body.email,
                            password: passwordEncypt,
                            role_id:role.role_id
                        }).then(user=>{
                            if(user){
                                res.status(201).json({user})
                            }
                        }).catch(error=>{
                            if(error instanceof ValidationError){
                                res.status(400).json({msg:error.message})
                            }
                            if(error instanceof UniqueConstraintError){
                                res.status(400).json({msg:error.message})
                            }
                        })
                    }else{
                        const msg = "Une erreur se produite au moment de la réaction!!"
                        res.status(400).json({msg})
                    }
                })
            }else{
                const msg = "Ce role existe pas!!"
                res.status(404).json({msg})
            }
        }).catch(error=>{
            const msg = "Impossible de trouvé ce role"
            res.status(400).json({msg,data:error})
        })
    })
}

export function login(app){
    app.post('/api/login',async(req,res)=>{
      const user =  await User.findOne({where : {email: req.body.email}})
        .then(userExist=>{
            if(!userExist){
                const msg = "Email ou password incorrect!!"
                res.status(404).json({msg})
            }
            bcrypt.compare(req.body.password,userExist.password)
            .then(isCorrectPwd=>{
                 Role.findByPk(userExist.role_id)
                .then(role=>{
                    if(isCorrectPwd){
                    const secret = "278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f"
                    const tokenPaylod = {"iat": new Date(),"user_id":userExist.user_id,"role":role.libelle}
                    const token = new TokenSigner('ES256K',secret).sign(tokenPaylod)
                   res.json({token})
                }else{
                    const msg = "password incorrect!!"
                    res.status(400).json({msg})
                }
                })
               
            }).catch(error=>{
                res.json({error})
            })
           // res.json({userExist})
        }).catch(error=>{
            if(error instanceof ValidationError){
                res.status(400).json({msg:error.message})
            }
        })
    })
}