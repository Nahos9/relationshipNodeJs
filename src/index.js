import express from 'express'
import bodyParser from 'body-parser'
import { sequelize } from '../confiDB.js'
const app = express()
const port = process.env.PORT || 4000

sequelize

app.use(bodyParser.json())


app.listen(port,()=>{
    console.log(`Le serveur écoute sur l'adresse http://localhost:${port}`)
})
