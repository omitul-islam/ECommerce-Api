import mongoose from "mongoose";
import { cartModel } from "../cart/cart.model.js";
import productModel from "../product/product.model.js";
import { orderModel } from "./order.model.js";


export const createOrderService = async(userId, address) => {
    const cart = await cartModel.findOne({user: userId}).populate('items.product');
    if(!cart) {
        return null;
    }

    const products = cart.items.map(item => item.product);
    const productIds = products.map(product => ({
        productId: new mongoose.Types.ObjectId(product._id),
        quantity: cart.items.find(item => item.product._id.toString() === product._id.toString()).quantity,
        price:cart.items.find(item => item.product._id.toString() === product._id.toString()).price
    }));

    const totalAmount = cart.totalAmount;

    const order = new orderModel({
        user: userId,
        products: productIds,
        totalAmount: totalAmount,
        address: address,
        status: "pending",
    });

    for(const item of cart.items) {
        const product = await productModel.findById(item.product._id);
        if(product) {
            product.stock -= item.quantity;
            await product.save();
        }
    }

    await order.save();
    await cartModel.findByIdAndDelete(cart._id);
    return order;
}


export const getOrdersService = async () => {
    const orders = await orderModel.find({}).populate('user', 'username email').populate('products');
    return orders;
}