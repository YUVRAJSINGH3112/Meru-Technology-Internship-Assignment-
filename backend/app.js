const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./db/mongoose-connection');
const userRoutes = require('./routers/user.routes');
const invoiceRoutes= require('./routers/invoice.routes')

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/api/user',userRoutes);
app.use('/api/invoices',invoiceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});