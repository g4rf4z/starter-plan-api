import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

import { createServer } from './server/createServer';
// import express from 'express';

const port = process.env.PORT || config.get<number>('port');
const app = createServer();

import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
