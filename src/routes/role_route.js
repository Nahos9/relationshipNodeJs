import { UniqueConstraintError, ValidationError } from "sequelize"
import { Role } from "../../confiDB.js"

export function createRole(app){
    app.post('/api/roles',async(req,res)=>{
        await Role.create({
            libelle: req.body.libelle,

        }).then(role=>{
            if(role){
                const msg = "role crée avec success!!"
                res.status(201).json({msg,data:role})
            }
        }).catch(error=>{
            if(error instanceof ValidationError){
                res.status(400).json({msg : error.message,data:error})
            }

            if(error instanceof UniqueConstraintError){
                res.status(400).json({msg : error.message,data:error})
            }
        })
    })
}