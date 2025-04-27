import { addToCartService, getCartService, updateCartService } from "./cart.service.js";


export const addToCart = async (req, res) => {
     try {
        const product = req.params.id
        // const {quantity, price} = req.body;
        if(!req.user) {
            return res.status(401).json({message: "log in first to add an item to the cart!"});
        }
        const cart = await addToCartService(req.user.id, product);
        if(cart === null) {
            return res.status(409).json({message: "Not enough stock available"});
        }
      
        return res.status(200).json({message: "Item added to cart successfully", cart});
     } catch (error) {
        return res.status(500).json({message: "Error adding item to cart", error: error.message});
     }
}

export const getCart = async (req, res) => {
    try {
      const cart = await getCartService(req.user.id);  
      if (!cart) {
        return res.status(404).json({ message: "Cart is empty!"});
      }
      return res.status(200).json({ message: "Cart fetched successfully", cart });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching cart", error: error.message });  
    }
}

    export const updateCart = async (req, res) => {
        try {
        const { quantity } = req.body;
        console.log(quantity);
        const productId = req.params.id;
        const userId = req.user.id;
        console.log(userId);
        const updatedCart = await updateCartService(userId, productId, quantity);
        console.log(updatedCart);
        if(updatedCart === null) {
            return res.status(404).json({ message: "Cart is empty!"});
        }

        if(updatedCart === undefined) {
            return res.status(404).json({ message: "Product not found in cart!"});
        }

        return res.status(200).json({message: "Cart updated successfully", cart: updatedCart });
        } catch (error) {
        return res.status(500).json({ message: "Error updating cart", error: error.message });  
        }
}