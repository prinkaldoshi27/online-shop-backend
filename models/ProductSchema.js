const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: {type : Number, required: true},
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    quantity: { type: Number },
    inventoryStatus: { type: String },
    rating: { type: Number ,
        default: 3
    },
    image: {
        type: String,
        required: true,
    }
}, { versionKey: false });

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
