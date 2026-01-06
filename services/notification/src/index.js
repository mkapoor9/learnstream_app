import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import router from "./routes/notificationRoutes.js";
import { startNotificationConsumer } from './kafka/consumer.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/',router);

const PORT = process.env.PORT || 4006;

app.listen(PORT,async ()=>{
    console.log(`App is running on ${PORT}`)
    await startNotificationConsumer();
})