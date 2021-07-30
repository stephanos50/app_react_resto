const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');



dotenv.config();

const app = express();

app.use(express.json())

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(express.urlencoded({extended: true})); 




app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen( PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
