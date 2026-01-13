import express from "express";
import cors from 'cors'
import router from "./routes/userRoutes.js";
import { connectProducer } from "./kafka/producer.js";
import { startUserConsumer } from "./kafka/consumer.js";

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json())
app.use('/',router)

const PORT = process.env.PORT || 4002;

app.listen(PORT,async()=>{
    console.log(`User service running on port ${PORT}`);
    await startUserConsumer();
    await connectProducer();
})