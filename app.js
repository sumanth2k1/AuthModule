const express = require('express');
const { notFound } = require("./middleware/not-found");
const { errorHandlerMiddleware } = require("./middleware/error-handler");
const morgan = require('morgan')
const cors = require('cors');
const { StatusCodes } = require("http-status-codes");
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

// Routes
app.get('/health-monitor', (req, res) => res.status(StatusCodes.OK).json({ message: "Backend up and running...!" }))
app.use('/api/v1/auth', authRouter);

// Middlewares
app.use(notFound)
app.use(errorHandlerMiddleware)


module.exports = app