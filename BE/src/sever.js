import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectToDataBase from './config/connectDB';
import configCors from './config/cors'
import initApiRoutes from './routes/api'
require('dotenv').config();
const app = express();


//configCors
configCors(app);

//config view engine
configViewEngine(app);
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
//init web routes
initWebRoutes(app);

//init api routes
initApiRoutes(app);
//connect to database
connectToDataBase();


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})