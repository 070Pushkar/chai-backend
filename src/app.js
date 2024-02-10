import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";



const app = express();

 const CORS_ORIGIN ="*/*";
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
 // configuration in express
app.use(express.json({limit : "16kb"}));

app.use(express.urlencoded());

app.use(express.static());


app.use(cookieParser());

// routes import 

import userRouter from "./routes/user.routes.js";




/// routes declaration

app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register
export {app};