import 'dotenv/config'
import express from 'express'
import { connectDB } from './config/db.js';
import authRoutes from "./routes/authRoutes.js"
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));

app.use(express.json());

//This route handle all authentication and authorization
app.use("/api/auth", authRoutes);

app.get("/", (req,res) => res.json("Hello"))
app.get("/user", (req, res) => res.json("User loading..."))


await connectDB(process.env.MONGODB_URI);
app.listen(PORT,() =>{
    console.log(`SERVER is running on http://localhost:${PORT}`)
})