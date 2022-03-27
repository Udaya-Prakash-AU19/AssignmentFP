const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const PORT = process.env.PORT || 2100
const connectDB = require('../configDB/db')
const router = require('../router/router')
const { errorHandler } = require('../middlewares/errorMidware')

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({origin:"http://localhost:3000"}))
app.use('/api/users', router)
app.use(errorHandler)


app.listen(PORT, console.log('Server started at PORT', PORT))
