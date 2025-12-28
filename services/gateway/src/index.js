import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import "dotenv/config";

import authRoutes from './routes/authRoute.js'
import proxyRoutes from './routes/proxyRoute.js'
import { rateLimiter } from './middleware/rateLimiter.js';


const app = express();
//app.use(cors());
//app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3002",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Gateway Received:", req.method, req.url);
  next();
});

const PORT = process.env.PORT || 3001;
app.use(cors({
  origin: "*",
  credentials: true
}));

console.log("📌 Loading authRoutes...");
console.log("authRoutes:", authRoutes);

app.use('/auth',authRoutes);
app.use(rateLimiter(100,60*1000))
app.use('/',proxyRoutes)

app.listen(PORT,()=>{
    console.log("API gateway running on port : 3001")
})


