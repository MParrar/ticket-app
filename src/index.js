const express = require('express');
const ticketRoutes = require('./routes/tickets');
const statusRoutes = require('./routes/status');
const categoryRoutes = require('./routes/category');
const cors = require('cors');

const { dbConnection } = require('./database');

require("dotenv").config()

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json())
app.use('/api', ticketRoutes);
app.use('/api', statusRoutes);
app.use('/api', categoryRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
dbConnection();