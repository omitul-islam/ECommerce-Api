import { createOrderService, getOrdersService } from "./order.service.js";

export const createOrder = async (req, res) => {
    try {
       const userId = req.user.id;
       const {address} = req.body;
       
       const order = await createOrderService(userId, address);
       console.log(order);
       if(!order) {
           return res.status(404).json({message: "Cart is empty or login first to make an order!"});
       }
         console.log(order);
       return res.status(200).json({message: "Order created successfully", order});
       
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error: error.message });
    }
}

export const getOrders = async (req, res) => {
      try {
        const orders = await getOrdersService();
        if(!orders) {
            res.status(404).json({message: "No orders found!"});
        }
        console.log(orders);
        return res.status(200).json({message:"Orders fetched successfully", orders});
      } catch (error) {
        res.status(500).json({message:'Error Fetching orders',error:error.message});
      }
}