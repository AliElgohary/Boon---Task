import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const createPaymentSession = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `http://localhost:4200/form`,
      cancel_url: `http://localhost:4200/form`,
      customer_email: user.email, 
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${user.name} Product`,
          },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
    });
    res.json({ message: "success", user: user, payment_URL: session.url });
  } catch (err) {
    console.error("error creating payment :", err);
    res.status(500).json({ message: "error creating payment" });
  }
};
