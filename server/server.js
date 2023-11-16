const stripe = require('stripe')('sk_test_51NzdBuBdw2QVryfebqU2FcmMP7p7KnKYT27C7JZ1wMXblfeFz4bKobo7MxhcFLMVZDb7DWrtUHPThnYmnDo0zrR400OFoyo9e3');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// Define a route to handle the success URL
app.get('/success', (req, res) => {
  // Retrieve the session ID from the query parameters
  const { session_id } = req.query;

  // Use the session ID to retrieve more information about the session if needed

  // Handle success logic here
  res.send(`Order placed successfully! Session ID: ${session_id}`);
});

// Define a route to handle the canceled URL
app.get('/canceled', (req, res) => {
  // Handle canceled logic here
  res.send("Order canceled -- continue to shop around and checkout when you're ready.");
});

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1OAG0VBdw2QVryfed1Yw5qMj',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`, // Include the session ID as a query parameter
    cancel_url: `${YOUR_DOMAIN}/canceled`,
  });

  res.redirect(303, session.url);
});

// Manually handle the root path
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.listen(4242, () => console.log('Running on port 4242'));
