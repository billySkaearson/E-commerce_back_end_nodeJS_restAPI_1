const express = require('express');
const logger = require('./middleWare/logger');
const productsRouter = require('./api/products');
const orderRouter = require('./api/orders');
const authRouter = require('./api/auth');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(logger);
app.use('/api/products',productsRouter);
app.use('/api/orders',orderRouter);
app.use('/api/auth',authRouter);





const PORT = process.env.PORT || 5000;
app.listen(PORT,(req,res)=>{console.log(`app is runing... on port ${PORT}`);})
