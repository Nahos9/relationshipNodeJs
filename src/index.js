import express from 'express'
import bodyParser from 'body-parser'
import { sequelize } from '../confiDB.js'
import { inscription, login } from './routes/user_route.js'
import { createRole } from './routes/role_route.js'
import { authMidelware } from './midelware/authMidelware.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 4000


app.use(cors())
app.use(bodyParser.json())

// app.get('/',authMidelware,(req,res)=>{
//     console.log("hello Express JS")
// })
//les routes
inscription(app)
login(app)
createRole(app)
app.listen(port,()=>{
    console.log(`Le serveur écoute sur l'adresse http://localhost:${port}`)
})
