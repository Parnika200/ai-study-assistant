import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import studyPlannerRoutes from "./routes/studyPlannerRoutes.js";

const app=express()


app.use(cors());

app.use(express.json())

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/documents", documentRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/study-plan", studyPlannerRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("connected"))
  .catch(err => console.log(err));

app.get("/",(req,res)=>{
    res.send("running")
})
app.listen(5000,()=>{
    console.log("http://localhost:5000")
})