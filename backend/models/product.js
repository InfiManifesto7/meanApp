const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProdSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    imageUrl: {
        type: String,
        required: true
    },
});


const Product = mongoose.models.Product || mongoose.model("Product", ProdSchema);

module.exports = Product;
