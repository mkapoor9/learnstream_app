import "dotenv/config";
import express from 'express';
import cors from 'cors';

//import router from './routes/authRoutes';
import  authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();

console.log("PWD:", process.cwd());
console.log("Looking for .env in:", process.cwd());

const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log("Auth Received:", req.method, req.url);
  next();
});


app.use('/auth',authRoutes);

app.use(errorHandler);



app.listen(PORT,()=>{
    console.log("Auth service running on port 4001");
});
