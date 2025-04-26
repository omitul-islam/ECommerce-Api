import productModel from "../product/product.model.js";
import { cartModel } from "./cart.model.js";

export const addToCartService = async (userId, productId, quantity) => {
    const product = await productModel.findById(productId);
    console.log(product.stock);
    console.log(quantity);
    if(product.stock < quantity) {
        return null;
    }
    const price = product.price;
    let cart = await cartModel.findOne({user: userId});

    if(!cart){
        cart = new cartModel({ 
            user: userId,
            items:[{
                product: productId,
                quantity: quantity,
                price: price,
            }],
            totalAmount: quantity * price,
         });
    } else {
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());
        if(itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
            cart.totalAmount += quantity * price;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: price
            });
            cart.totalAmount = quantity * price;
        }
    }
    await cart.save();
    return cart;
}


export const getCartService = async (userId) => {
    const cart = await cartModel.findOne({user: userId}).populate('items.product');
    return cart;
}

export const updateCartService = async (userId, productId, quantity) => {
    const cart = await cartModel.findOne({user: userId});
    if(!cart) {
        return null;
    }
    console.log("cart",cart);

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());
    if(itemIndex === -1) {
       return undefined;
    }     
    
    cart.items[itemIndex].quantity = quantity;

    cart.totalAmount = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    await cart.save();
    return cart;
}

