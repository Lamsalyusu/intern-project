// require('dotenv').config();
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET as string;
dotenv.config();

function signInToken(payload:Object):string {
    return jwt.sign(payload,jwtSecret,{expiresIn:'1d'});
}

function verifyToken(token:string){
    return jwt.verify(token,jwtSecret);
}
export { signInToken,verifyToken };