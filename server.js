const path = require("path");
const express = require('express');
const dotenv = require("dotenv");
const { notFound } = require("./middleware/not-found");
const { errorHandlerMiddleware } = require("./middleware/error-handler");
const morgan = require('morgan')
const cors = require('cors');
const { StatusCodes } = require("http-status-codes");
const { ConnectDB } = require("./database/connect");
const authRouter = require('./routes/authRoutes');

// Environment Config
const envFile = process.env.NODE_ENV === "development" ? ".env.development" : ".env.production";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app = express();
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

const port = process.env.PORT;
const url = process.env.MONGO_URL;

// Routes
app.get('/health-monitor', (req, res) => res.status(StatusCodes.OK).json({ message: "Backend up and running...!" }))
app.use('/api/v1/auth', authRouter);


// Middlewares
app.use(notFound)
app.use(errorHandlerMiddleware)

// Server connection
const start = async () => {
    try {
        await ConnectDB(url);
        app.listen(port, console.log(`server started at : http://localhost:${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();