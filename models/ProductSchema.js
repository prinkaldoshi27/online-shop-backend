const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    rating: { type: Number, required: true, min: 1, max: 5, default: 3 }, 
    comment: { type: String, required: true },  
    createdAt: { type: Date, default: Date.now }  
});

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    quantity: { type: Number },
    inventoryStatus: { type: String },
    rating: { type: Number, default: 3 },
    image: { type: String, required: true },
    comments: { type: [CommentSchema], default: [] } 
}, { versionKey: false });

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
