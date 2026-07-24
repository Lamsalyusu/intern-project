import { ZodSchema } from "zod/v3";

const {Request:req , Response:res, NextFunction:next } = require('express');
// const {ZodSchema} = require('zod');
// import {ZodSchema} from 

function validation(schema: ZodSchema){
const result = schema.safeParse(req.body);
if(!result.success){
    return res.status(400).json({
        error:{
            code:"Validation error",
            message:"Invalid input",
            details:result.error.flatten().fieldErrors,
        },
    })
}
req.body = result.data;
next();
}
export default validation;

