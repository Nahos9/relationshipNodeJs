import express from 'express'
import bodyParser from 'body-parser'
import { inscription, login } from './routes/user_route.js'
import { createRole } from './routes/role_route.js'
import cors from 'cors'
import { isAdminMidelware } from './midelware/isAdminMidelware.js'

const app = express()
const port = process.env.PORT || 4000


app.use(cors())
app.use(bodyParser.json())

app.get('/',isAdminMidelware,(req,res)=>{
    console.log("hello Express JS")
})
//les routes
inscription(app)
login(app)
createRole(app)
app.listen(port,()=>{
    console.log(`Le serveur écoute sur l'adresse http://localhost:${port}`)
})
