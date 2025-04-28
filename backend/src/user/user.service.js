import userModel from "../auth/auth.model.js"


export const getUserService = async(userEmail) => {
      const user = userModel.findOne({email:userEmail});
      if(!user) {
        return null;
      }
      return user;
}