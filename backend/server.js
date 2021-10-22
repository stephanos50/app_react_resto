const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');


// Route files
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const allergenRoutes = require('./routes/allergenRoutes')
const cityRoutes = require('./routes/cityRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const rolesRoutes = require('./routes/roleRoutes')
const addressRoutes = require('./routes/addressRoutes')
const authRoutes = require('./routes/authentification');
const contactRoutes = require('./routes/contactRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const facturesRoutes =require('./routes/facturesRoutes')


const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());



dotenv.config();



if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }


// Mount routers
app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/allergens', allergenRoutes);
app.use('/api/cities',cityRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/address', addressRoutes),
app.use('/api/address', addressRoutes),
app.use('/api/authentification', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/factures', facturesRoutes);


app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const _dirname = path.resolve()
app.use('/uploads', express.static(path.join(_dirname, '/uploads')))



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, '/frontend/build')));


  app.get('*', (req, res) =>
    res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'))
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
