import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

import { createServer } from './server/createServer';

const port = process.env.PORT || config.get<number>('port');
const app = createServer();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// app.post('/user/:userId/cart/:cartId', async (req, res) => {
//   const { userId, cartId } = req.params;
//   const { productId } = req.body;

//   // Vérification de l'existence de l'utilisateur, du panier et du produit
//   const user = await prisma.user.findUnique({ where: { id: userId } });
//   if (!user) return res.status(404).send('User not found');

//   const cart = await prisma.cart.findUnique({ where: { id: cartId } });
//   if (!cart) return res.status(404).send('Cart not found');

//   const product = await prisma.product.findUnique({ where: { id: productId } });
//   if (!product) return res.status(404).send('Product not found');

//   // Création du CartItem
//   const cartItem = await prisma.cartItem.create({
//     data: {
//       cartId,
//       productId,
//     },
//   });

//   return res.json(cartItem);
// });

// Lecture du panier d'un utilisateur avec les articles du panier
// app.get('/user/:userId/cart', async (req, res) => {
//   const { userId } = req.params;

//   // Vérification de l'existence de l'utilisateur
//   const user = await prisma.user.findUnique({ where: { id: userId } });
//   if (!user) return res.status(404).send('User not found');

//   // Lecture du panier de l'utilisateur avec les articles du panier
//   const cart = await prisma.cart.findUnique({
//     where: { userId },
//     include: {
//       cartItems: {
//         include: { product: true },
//       },
//     },
//   });

//   if (!cart) return res.status(404).send('Cart not found');

//   return res.json(cart);
// });

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const webhookSecretKey = process.env.STRIPE_WEBHOOK_SECRET_KEY;

// app.post(
//   '/webhook',
//   express.raw({ type: 'application/json' }),
//   (request, response) => {
//     const sig = request.headers['stripe-signature'];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         sig,
//         webhookSecretKey
//       );
//     } catch (error) {
//       return response.status(400).send('bad_request');
//     }

//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntentSucceeded = event.data.object;
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// );

app.listen(port, async () => {
  console.info(`Server is running on port: ${port}`);
});
