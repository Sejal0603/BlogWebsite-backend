import express from 'express'
import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';
import { Connection } from './database/db.js';
import router from './routes/route.js';
dotenv.config();
const app=express();

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',router);
const port=8000;

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
  }));
app.listen(port,()=>
console.log('server is running helloo............'))

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);