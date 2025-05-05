const express = require('express')
const path = require('node:path')
const router = require('./router')
const assetsPath = path.join(__dirname, 'public')
require('dotenv').config()

const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static(assetsPath))
app.use('/',router)
app.listen(process.env.PORT||3000)