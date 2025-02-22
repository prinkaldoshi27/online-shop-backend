const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductSchema = require("./models/ProductSchema");
const UserSchema = require("./models/UserModel");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://prinkaldoshi:7021804184%40Pd@store.xuu65.mongodb.net/store")
    .then(() => console.log("Connected to MongoDB"))

app.get("/getItems", (req, res) => {
    ProductSchema.find()
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.post("/setItems", async (req, res) => {
    try {
        console.log("Received data:", req.body); 

        const newProduct = new ProductSchema(req.body);
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error saving product:", err); 
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});


app.get("/getUsers", (req, res) => {
    UserSchema.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.post("/setUsers", async (req, res) => {
    try {
        console.log("Received data:", req.body); 

        const newUser = new UserSchema(req.body);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});


app.get("/", (req, res) => {
    res.send("Welcome to our online shop API...");
});

// const port = process.env.PORT || 5000;
// app.listen(port, console.log(`Server running on port ${port}`));

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
