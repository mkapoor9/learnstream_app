import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import courseRoutes from './routes/courseRoutes.js'
import { connectCourseProducer } from './kafka/producer.js';
import { startCourseConsumer } from './kafka/consumer.js';

const app = express();

const PORT = process.env.PORT;
console.log(PORT)

app.use(cors());
app.use(express.json());

app.use('/',courseRoutes);

app.listen(PORT,async ()=>{
    console.log(`App is running on PORT ${PORT}`)
    await startCourseConsumer();
    await connectCourseProducer();
})