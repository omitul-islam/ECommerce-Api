import userModel from "../auth/auth.model.js";
import { orderModel } from "../order/order.model.js";


export const deleteUserService = async (id) => {
    const todo = await userModel.findById(id);
    if(!todo) return null;
    return await userModel.findByIdAndDelete(id);
}

export const updateUserService = async(userId, updateFields) =>{
    const user = await userModel.findById(userId);
    // console.log(">>>>",updateFields);
    let {username, email, role} = updateFields;
    if(username !== undefined) {
        user.username = username;
    }
    if(email !== undefined) {
        user.email = email;
    }
    if(role !== undefined) {
        user.role = role;
    }
    return await user.save();
}

export const getUsersService = async () => {
    return await userModel.find().select("-password");
}

export const getUserByIdService = async (id) => {
    return await userModel.findById(id).select('-password');
}


export const getOrdersService = async () => {
    const orders = await orderModel.find({}).populate('user', 'username email').populate('products.productId');
    return orders;
}

export const updateOrdersService = async (orderId, updateField) => {
    const order = await orderModel.findById(orderId);
    if(!order) return null;
    order.status = updateField.status;
    return await order.save();
}

export const deleteOrderService = async (orderId) => {
    const order = await orderModel.findById(orderId);
    if(!order) return null;
    return await orderModel.findByIdAndDelete(orderId);
}
