import productModel from "../product/product.model.js";
import { cartModel } from "./cart.model.js";

export const addToCartService = async (userId, productId) => {
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
  
    const price = product.price;
    let cart = await cartModel.findOne({ user: userId });
  
    if (!cart) {
      cart = new cartModel({
        user: userId,
        items: [{
          product: productId,
          quantity: 1,
          price: price,
        }],
        totalAmount: price,
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());
  
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
        cart.items[itemIndex].price = price * cart.items[itemIndex].quantity;
        cart.totalAmount += price;
      } else {
        cart.items.push({
          product: productId,
          quantity: 1,
          price: price,
        });
        cart.totalAmount += price;
      }
    }
  
    await cart.save();
    return cart;
  };
  
  


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
    const updatedCart = await cartModel.findOne({ user: userId }).populate("items.product");
    return updatedCart;
}

export const clearCartService = async(userId) => {
    const cart = cartModel.findOneAndDelete({user:userId});
    if(!cart) {
      return null;
    }
    return cart;
}

