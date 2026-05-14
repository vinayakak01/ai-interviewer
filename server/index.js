import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 6060;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res) => {
    res.status(200).json({message : "this is get api"});
})

app.use("/api/auth", authRouter);


app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`);
    connectDb();
});
