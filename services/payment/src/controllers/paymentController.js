import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req,res)=>{
    const {courseId,price} = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        mode:"payment",
        line_items:[
            {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:"Course Purchase"
                    },
                    unit_amount:price*100,
                },
                quantity:1,
            }
        ],
        success_url:`${process.env.FRONTEND_URL}/payment-success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        metadata:{
            userId:req.user.id,
            courseId
        }
    })

    await prisma.payment.create({
        data:{
            userId:req.user.id,
            courseId,
            stripeSessionId : session.id,
            amount:price,
            currency:"USD",
            status:"PENDING"
        }
    })

    res.json({url:session.url})
}