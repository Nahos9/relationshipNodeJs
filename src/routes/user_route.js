import { UniqueConstraintError, ValidationError } from "sequelize"
import { Role, User } from "../../confiDB.js"
import bcrypt from 'bcrypt'

export  function createUser(app){
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