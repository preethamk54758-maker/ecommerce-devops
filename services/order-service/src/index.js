const express = require('express');
const client = require('prom-client');
const app = express();
const PORT = process.env.PORT || 3003;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'order-service' });
});

app.get('/orders', (req, res) => {
  res.json([
    { id: 1, product: 'Laptop', quantity: 1, status: 'delivered' },
    { id: 2, product: 'Phone', quantity: 2, status: 'pending' }
  ]);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
