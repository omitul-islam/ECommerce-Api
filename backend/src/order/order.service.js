import { cartModel } from "../cart/cart.model.js";
import productModel from "../product/product.model.js";
import { orderModel } from "./order.model.js";


export const createOrderService = async(userId, address) => {
    const cart = await cartModel.findOne({user: userId}).populate('items.product');
    if(!cart) {
        return null;
    }

    console.log("CART",cart);
    const products = cart.items.map(item => item.product);

    const totalAmount = cart.totalAmount;
    console.log(products);
    const order = new orderModel({
        user: userId,
        products: products,
        totalAmount: totalAmount,
        address: address,
        status: "pending",
    })

    for(const item of cart.items) {
        const product = await productModel.findById(item.product);
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