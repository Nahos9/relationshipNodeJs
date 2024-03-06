import express from 'express'
import bodyParser from 'body-parser'
import { sequelize } from '../confiDB.js'
import { inscription, login } from './routes/user_route.js'
import { createRole } from './routes/role_route.js'
const app = express()
const port = process.env.PORT || 4000

sequelize

app.use(bodyParser.json())

//les routes
inscription(app)
login(app)
createRole(app)
app.listen(port,()=>{
    console.log(`Le serveur écoute sur l'adresse http://localhost:${port}`)
})
