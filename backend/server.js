const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const allergenRoutes = require('./routes/allergenRoutes')
const cityRoutes = require('./routes/cityRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const rolesRoutes = require('./routes/roleRoutes')


dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

app.use(express.json())

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/allergens', allergenRoutes);
app.use('/api/cities',cityRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/roles', rolesRoutes);


app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)


app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')))


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen( PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
