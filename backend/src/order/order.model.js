import mongoose from "mongoose";
import { number } from "zod";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
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
        enum: ["pending", "shipped", "delivered", "cancelled", "confirmed"],
        default: "pending",
    },
}, { timestamps: true });

export const orderModel = mongoose.model("Order", orderSchema);
