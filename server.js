const path = require("path");
const express = require('express');
const ConnectDB = require('./database/connect')
const dotenv = require("dotenv");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const envFile = process.env.NODE_ENV === "development" ? ".env.development" : ".env.production";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app = express();

const port = process.env.PORT;
const url = process.env.MONGO_URL;

// Routes
app.get('/health-monitor', (req, res) => res.send("Backend up and running...!"))

// Middlewares
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await ConnectDB(url);
        app.listen(port, console.log(`server started at : http://localhost:${port}`));        
    } catch (error) {
        console.log(error);
    }
}

start();
