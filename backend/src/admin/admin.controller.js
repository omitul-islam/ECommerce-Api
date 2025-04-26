import { deleteOrderService, deleteUserService, getOrdersService, getUserByIdService, getUsersService, updateOrdersService, updateUserService } from "./admin.service.js";

export const deleteUser = async(req, res) => {
    try {
       const userId = req.params.id;
       const deletedUser = await deleteUserService(userId);
       if(!deletedUser) {
          return res.status(404).json({message: "User not found!"});
       }
       const {password, ...rest} = deletedUser.toObject();
       return res.status(200).json({message: "User deleted successfully!", deletedUser:rest});

    } catch (error) {
      return res.status(500).json({message: "Error deleting user", error: error.message});
    }
}

export const updateUser = async(req, res) => {
   try {
      const userId = req.params.id;
      const user = await updateUserService(userId, req.body);
      if(!user) {
          return res.status(404).json({message:"user not found!"});
      }
      
      const {password, ...rest} = user.toObject();
      return res.status(200).json({message: "User updated successfully!", updatedUser:rest});
       
   } catch (error) {
     return res.status(500).json({message: "Error updating user", error: error.message});
   }
}

export const getUsers = async(req, res) => {
     try {
        const users = await getUsersService();
          if(!users || users.length === 0) {
              return res.status(404).json({message: "No users found!"});
          }
          return res.status(200).json({message: "All the users are fetched successfully!", Users:users});
     } catch (error) {
          return res.status(500).json({message: "Error fetching users", error: error.message});
     }
}

export const getUserById = async(req,res) => {
  try {
      const userId = req.params.id;
      const user = await getUserByIdService(userId);
      if(!user) {
          return res.status(404).json({message: "User not found!"});
      }
      return res.status(200).json({message: "User found successfully!", User:user});
  } catch (error) {
      return res.status(500).json({message: "Error fetching user", error: error.message});
  }
}

export const updateOrders = async(req,res) => {
    try {
       const updateField = req.body;
       const orderId = req.params.id;
       const updatedOrder = await updateOrdersService(orderId, updateField);
       if(!updatedOrder) {
          return res.status(404).json({message: "Order not found!"});
       }
       return res.status(200).json({message: "Order updated successfully!", updatedOrders:updatedOrder});
    } catch (error) {
      return res.status(500).json({message: "Error updating orders", error: error.message});   
    }
}

export const getOrders = async(req,res) => {
    try {
        const orders = await getOrdersService();
        if(!orders) {
            return res.status(404).json({message: "No orders found!"});
        }
        return res.status(200).json({message: "Orders fetched successfully!",Orders: orders}); 
    } catch (error) {
      return res.status(500).json({message: "Error fetching orders", error: error.message});  
    }
}

export const deleteOrder = async(req,res) => {
    try {
        const orderId = req.params.id;
        const deleteOrder = await deleteOrderService(orderId);
        if(!deleteOrder) {
        return res.status(404).json({message: "Order not found!"});
        }
        return res.status(200).json({message: "Order deleted successfully!", deletedOrder: deleteOrder});
    } catch (error) {
        return res.status(500).json({message: "Error deleting order", error: error.message});
    }
}
