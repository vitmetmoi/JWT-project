import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectToDataBase from './config/connectDB';
import configCors from './config/cors'
import initApiRoutes from './routes/api'
require('dotenv').config();
const app = express();
import JWTService from './middleware/JWTservice'

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

JWTService.createToken();
JWTService.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmFvRHV5IiwiaWF0IjoxNzM0OTQ1MzA0fQ.d5ePl7HZP1kuHdqAnp3lboTU_mrez-1CxAR_8t3pJeA', process.env.JWT_SECRET)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})