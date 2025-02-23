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

app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Product ID format" });
        }
        const objectId = new mongoose.Types.ObjectId(id);
        const product = await ProductSchema.findById(objectId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/products/:id/comments", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, rating, comment } = req.body;

        if (!name || !comment) {
            return res.status(400).json({ error: "Name and comment are required" });
        }

        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Product ID format" });
        }

        // Fetch the product by ID
        const product = await ProductSchema.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Add the comment
        const newComment = { name, rating: rating || 3, comment, createdAt: new Date() };
        product.comments.push(newComment);

        // Save the updated product
        await product.save();

        res.status(201).json({ message: "Comment added successfully", product });
    } catch (error) {
        console.error("🚨 Error adding comment:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
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

app.put("/updateUser/:id", async (req, res) => {
    try {
        const updatedUser = await UserSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ error: "Failed to update user" });
    }
});

app.delete("/deleteUser/:id", async (req, res) => {
    try {
        const deletedUser = await UserSchema.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully", id: req.params.id });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).json({ error: "Failed to delete user" });
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
