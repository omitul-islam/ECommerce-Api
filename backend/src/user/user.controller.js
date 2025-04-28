import { getUserService } from "./user.service.js";


export const getUser = async(req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await getUserService(userEmail);
        if(!user) {
            return res.status(404).json({message: "No user found for this email"});
        }
        return res.status(200).json({message:"User fetched successfully",user:user});
    } catch (error) {
        return res.status(500).json({message:"Error fetching user!",error:error.message});
    }
}