const  bcrypt = require("bcrypt");

const  cors = require("cors");

const  jwt = require("jsonwebtoken");

const { 
    MongoClient,
    ObjectId
 } = require("mongodb");

const express = require("express");

const app = express();

const userRoutes = require("../routes/user-routes");

app.use("/api", userRoutes); 

app.use(cors()); 

app.use(express.json()); 

app.use(express.json());

app.use("/", userRoutes); 

app.listen(20000, () => {

console.log("20000 portundan dinliyor")});