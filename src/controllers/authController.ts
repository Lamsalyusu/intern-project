import { findByEmail,createUser,findById } from "../repositories/userRepository";
import { LoginInput, RegisterInput} from "../validators/authValidator";
import { registerUser,loginUser } from "../services/authService";
import { Request,Response } from "express";
// const bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt';

const authController = {
    register: async(req:Request,res:Response) =>{
        try{
            const data = req.body as RegisterInput;
            const result = await registerUser(data);
            return res.status(201).json({message:'registered successfully',data:result});
        }
        catch(error:any){
            return res.status(error.status || 500).json({
                error:{message:error.message || "Something went wrong"}
            });
        }

    },

    login:async(req:Request,res:Response)=>{
        try{
            const data = req.body as LoginInput;
            const result = await loginUser(data);
            return res.status(200).json({message:'logged in successfully',data:result})
        }
        catch(error:any){
            return res.status(error.status ||500).json({
                error:{message:error.message || "Something went wrong"},
            });
        }
    },

    me: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const user = await findById(userId);

      if (!user) {
        return res.status(404).json({ error: { message: "User not found" } });
      }

      return res.status(200).json({
        data: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error: any) {
      return res.status(500).json({ error: { message: "Something went wrong" } });
    }
  },

};
export default authController;
