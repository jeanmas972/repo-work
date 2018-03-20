import express from 'express';
import path from "path";
//import mongoose from "mongoose";
//import bodyParser from "body-parser";
//import dotenv from "dotenv";
//import Promise from "bluebird";

//import auth from "./routes/auth";
//import users from "./routes/users";
//import books from "./routes/books";

const app = express();

app.post('/api/auth', (req, res) => {
    res.status(400).json({ errors: { global: "Invalid credentials"} });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3334, () => console.log('Running on localhost:3334'));