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

app.post("/heroes", async (req, res) => {
	await heroes.create(req.body);

	res.status(201).json({
		message: "heroes created",
	});
});

app.get("/heroes", async (_req, res) => {
	const hero = await heroes.find();

	res.json(hero);
});

app.get("/heroes/:name", async (req, res) => {
    let hero;
    try {
        hero = await heroes.find(req.params);
    } catch (err){
        console.log(err);
    }
	res.json(hero);
});

app.get("/heroes/:name/powers", async (req, res) => {
    let hero;
    try {
        hero = await heroes.find(req.params).select("power")
    } catch (err){
        console.log(err);
    }
	res.json(hero);
});

app.delete("/heroes/:name", async (req, res) => {
    try {
      await heroes.findOneAndDelete(req.params);
    } catch (err) {
      console.log(err);
      return res.status(400).send("error 400");
    }
    res.send("hero removed");
});

app.use("*", (err, req, res, next) => {
    res.send("error");
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});