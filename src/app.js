const express =  require('express');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const listingRoutes = require('./routes/listing.routes');
const bookingRoutes = require('./routes/booking.routes');
const cors = require('cors');
const connectDB = require('./db/db');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/listing',listingRoutes)
app.use('/api/booking', bookingRoutes);


module.exports = app;
