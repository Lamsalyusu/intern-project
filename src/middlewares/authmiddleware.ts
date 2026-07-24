import {verifyToken} from "../utils/jwt";           
import { Request,Response,NextFunction } from "express";

function authMiddleware(req:Request,res:Response,next:NextFunction){
    const authheaders = req.headers.authorization;

    if(!authheaders || !authheaders.startsWith("Bearer ")){
        return res.status(401).json({error:{message:'no token provided'}});
    }
    const token = authheaders.split(" ")[1] as string;
    try{
        const decode = verifyToken(token);
        console.log(decode);
        next();
    }
    catch(error){
        return res.status(403).json({error:{message:'invalid or expires token'}})
    }
}