import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
}, { timestamps: true });

export const orderModel = mongoose.model("Order", orderSchema);
