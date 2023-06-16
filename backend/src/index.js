require('dotenv').config();
const express = require("express")
const app = express()
const conDB = require('./db/mongoose')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')
const port = 8000

conDB()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use(userRouter)

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(port, () => {
        console.log('Server started on port ' + port);
    })
})