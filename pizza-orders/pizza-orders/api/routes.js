const express = require('express');
const router = express.Router();
const prices = require('./data/prices.json')
const orders = require('./data/orders.json')
const dashboard = require('./data/dashboard.json')

router.get('/prices', async (req, res) => {
    res.send(prices);
});

router.get('/orders', async (req, res) => {
    res.send(orders);
});

router.post('/orders/add', async(req, res) => {
    orders.orders.push(req.body);
    res.json(orders);
});

router.put('/orders/update/:id', async(req, res) => {
    const id = req.params.id;
    orders.orders.forEach((order, i) => {
        if (order.id === id) {
           orders.orders.splice(i, 1, req.body);
        }
     });
    res.json(orders);
});

router.get('/dashboard', async (req, res) => {
    res.send(dashboard);
});

module.exports = router;