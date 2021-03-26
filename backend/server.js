import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'


dotenv.config()

const PORT = process.env.PORT || 5000

connectDB()
const app = express()
app.use(express.json())

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`.bgGreen.black))