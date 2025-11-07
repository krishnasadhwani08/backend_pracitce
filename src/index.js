import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
dotenv.config();

const app = express();


connectDB()
.then(()=>{
    app.listen(process.env.port || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
}
)
.catch((err)=>{
    console.log("MONGODB connection falied!!", err);
})

/*
const app= express();
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`the server is running at ${process.env.PORT}`)
        })
    }catch(error){
        console.error("ERROR:",error);
        throw error
    }
})()
*/
