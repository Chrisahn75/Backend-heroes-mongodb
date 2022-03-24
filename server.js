const express = require("express");
const mongoose = require("mongoose");
const heroes = require("./models/heroesModel");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env",
  });
const app = express();

app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI,
		{
			useNewUrlParser: true,
		}
	)
	.then(() => console.log("Connected to MongoDB"));


    app.get("/", (_req, res) => {
        res.send("Heroes");
    });
    

app.use("*", (err, req, res, next) => {
    res.send("error");
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});