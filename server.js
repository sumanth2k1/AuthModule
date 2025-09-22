const path = require("path");
const app = require('./app');
const { ConnectDB } = require('./database/connect');
const dotenv = require("dotenv");


// Environment Config
const envFile = process.env.NODE_ENV === "development" ? ".env.development" : ".env.production";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Environment Config

const port = process.env.PORT;
const url = process.env.MONGO_URL;

// console.log(port, url, process.env.NODE_ENV)

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