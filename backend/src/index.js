require('dotenv').config();
const express = require("express")
const app = express()
const conDB = require('./db/mongoose')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')
const likeRouter = require('./routers/like')
const port = 8000

conDB()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(postRouter)
app.use(likeRouter)

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(port, () => {
        console.log('Server started on port ' + port);
    })
})