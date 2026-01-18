import Stripe from 'stripe'
import prisma from '../db/prisma.js';
import { emitPaymentEvent } from '../kafka/producer.js'; 
import 'dotenv/config'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async(req,res) =>{
    const sig = req.headers['stripe-signature'];

    let event;

    try{
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    }catch(err){
        return res.status(400).send(`Webhook error :${err.message}`);
    }

    if(event.type === 'checkout.session.completed'){
        const session = event.data.object;

        const payment = await prisma.payment.update({
            where:{stripeSessionId:session.id},
            data:{status:"SUCCESS"},
        })

        await emitPaymentEvent({
            type:"PAYMENT_SUCCESS",
            userId:session.metadata.userId,
            courseId:session.metadata.courseId,
            paymentId:payment.id
        })
    }

    res.json({received:true});
}