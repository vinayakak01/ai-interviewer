import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 6060;

app.get('/',(req,res) => {
    res.status(200).json({message : "this is get api"});
})

app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
    connectDb();
});