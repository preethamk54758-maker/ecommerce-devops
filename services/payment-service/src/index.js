const express = require('express');
const client = require('prom-client');
const app = express();
const PORT = process.env.PORT || 3004;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'payment-service' });
});

app.get('/payments', (req, res) => {
  res.json([
    { id: 1, orderId: 1, amount: 999, status: 'success' },
    { id: 2, orderId: 2, amount: 998, status: 'pending' }
  ]);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`Payment service running on port ${PORT}`));
