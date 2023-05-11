import express from "express";
import {config} from 'dotenv'
import morgan from "morgan"
import cors from "cors"
import connectDB from "./config/db.js"
import UserRoute from "./routes/UserRoute.js"

config()
connectDB()

const app = express()
app.use(cors());
const port = process.env.PORT || 5000;
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/User" , UserRoute)


app.listen(port,(req , res)=>{
    console.log(`server listen on port ${port}`)
})

