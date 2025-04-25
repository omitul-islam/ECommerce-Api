import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
    },
    price:{
        type: Number,
    },
    category:{
       type: String,
    },
    stock:{
        type: Number,
    },
    image: {
        type: String,
    }
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;