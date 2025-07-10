import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: './.env'
})

connectDB().then(()=>{
    app.listen(process.env.PORT || 1234, ()=>{
        console.log(`Server running at port: ${process.env.PORT}`)
    })
}).catch((err)=>{
    connection.log("connection failed !!!", err)
})

