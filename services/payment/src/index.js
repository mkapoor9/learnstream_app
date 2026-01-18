import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import paymentRoutes from './routes/paymentRoutes.js'
import { emitPaymentEvent} from './kafka/producer.js';

const app = express();

const PORT = process.env.PORT;
console.log(PORT)

app.use(cors());
app.use(express.json());

app.use('/',paymentRoutes);

app.listen(PORT,async ()=>{
    console.log(`App is running on PORT ${PORT}`)
})