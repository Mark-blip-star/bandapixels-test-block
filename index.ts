declare module 'mongoose';
//@ts-ignore
import express from "express";
import {connect} from "mongoose";
import * as dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
async function start(){
    try{
        await connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.o9ruc.mongodb.net/test`)
        app.listen(PORT,async() => {
            console.log(`The server is working on port ${PORT}.Database connected`)
        })
    }catch (e){
        throw e
    }
}

start()