import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

import { connectMongo } from './db/mongo.js';
import { startConsumer } from './kafka/consumer.js';

import activityRoutes from './routes/activityRoutes.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use("/activity",activityRoutes);

const PORT = process.env.PORT || 4005

app.listen(PORT,async()=>{
    console.log(`Activity running on port ${PORT}`)
    await connectMongo();
    setTimeout(async()=>{
        await startConsumer();
    },10000);
    

})