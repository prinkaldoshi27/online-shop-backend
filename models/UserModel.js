const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    id: {type : Number, required: true},
    name: { type: String, required: true },
    email: { type: String , required: true},
    password: { type: String , required: true},
    dob: {type: Date},
    phone: {type: Number},
    gender: {type: String},
    country: {type: String},
    address: {type: String},
    image: {type: String}
}, { versionKey: false });

const Users = mongoose.model("users", UsersSchema);
module.exports = Users;
