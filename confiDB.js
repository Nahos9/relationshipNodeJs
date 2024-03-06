import {Sequelize} from 'sequelize'
import { userModel } from './src/models/userModel.js'
import { DataTypes } from "sequelize"
import { roleModel } from './src/models/role.js'


export const sequelize = new Sequelize('bibliotheque','root','',{
    host:'localhost',
    dialect : 'mariadb',
    logging: true
})

sequelize.sync({alter:true,force:true}).then(_=>{
    console.log('Connexion établie à la base de données!!')
}).catch(error=>{
    console.log(error)
})

const user = userModel(sequelize,DataTypes)
const role = roleModel(sequelize,DataTypes)

//Dans cette relatio, la clée entrangère est definie dans le modele cible (user)
role.hasMany(user,{foreignKey: 'role_id'})
user.belongsTo(role,{foreignKey: 'role_id'})