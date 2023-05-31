import express from "express";
import {config} from 'dotenv'
import morgan from "morgan"
import cors from "cors"
import connectDB from "./config/db.js"
import UserRoute from "./routes/UserRoute.js"
import PostRoute from "./routes/PostRoute.js"
import Student from "./routes/StudentRoute.js";
import Admin from "./routes/AdminRoute.js";

config()
connectDB()

const app = express()
app.use(cors());
const port = process.env.PORT || 5000;
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({extended:false}))
app.use("/uploads", express.static("./uploads"))



app.use("/User" , UserRoute)
app.use("/Post" , PostRoute)
app.use("/Student" , Student)
app.use("/Admin" , Admin)




app.listen(port,(req , res)=>{
    console.log(`server listen on port ${port}`)
})

