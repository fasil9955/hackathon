const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routers/usersRoutes');
const cors = require('cors');  // Import the cors package
const productRoutes = require('./routers/productsRoutes');
// const supplierRoutes = require('./routers/suppliersRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
require('./config/db');
app.use('/users', userRoutes);
app.use('/products', productRoutes);
// app.use('/suppliers', supplierRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
