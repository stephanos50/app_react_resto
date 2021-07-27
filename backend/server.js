const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');



dotenv.config();

const app = express();

app.use(express.json())

app.use('/api/products', productRoutes);

app.use(express.urlencoded({extended: true})); 
app.use(express.json());



app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen( PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
