import { response } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT = async(req,res,next)=>{
    const excluded = ['/auth/login','auth/signup'];

    if(excluded.includes(req.path)) return next;

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error:"Token missing"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();

    }catch(e){
        return res.status(403).json({
            message:"Invalid Token",
        })
    }
}