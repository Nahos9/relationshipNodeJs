import {Sequelize} from 'sequelize'
import { userModel } from './src/models/userModel.js'
import { DataTypes } from "sequelize"
import { roleModel } from './src/models/role.js'


export const sequelize = new Sequelize('bibliotheque','root','',{
    host:'localhost',
    dialect : 'mariadb',
    logging: false
})

sequelize.sync({alter:true}).then(_=>{
    console.log('Connexion établie à la base de données!!')
}).catch(error=>{
    console.log(error)
})

export const User = userModel(sequelize,DataTypes)
export const Role = roleModel(sequelize,DataTypes)

//Dans cette relation, la clée entrangère est definie dans le modele cible (user)
Role.hasMany(User,{foreignKey: 'role_id'})
User.belongsTo(Role,{foreignKey: 'role_id'})