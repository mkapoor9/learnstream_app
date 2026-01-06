import prisma from "../db/prismaSe.js";
import { hashPassword,comparePassword } from "../utils/hash.js";
import { generateRefreshToken,generateAccessToken } from "../utils/jwt.js";
import { hash } from "bcrypt";
import { sendUserActivity } from "../kafka/producer.js";

export const signup = async(req,res,next) =>{
    try{

    
    const {email,password} = req.body;

    console.log(typeof password)

    const existing = await prisma.user.findUnique({
        where:{
            email,
        }
    })

    if(existing){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const hashedPassword = await hashPassword(password);

    console.log(typeof hashedPassword)

    

    const newUser = await prisma.user.create({
        data:{
            email,
            password:hashedPassword 
        }
    })

    await sendUserActivity({
        eventId : crypto.randomUUID(),
        type:"USER_SIGNUP",
        userId:newUser.id,
        source :"auth-service",
        timestamp : new Date().toISOString(),
        metadata:{
            email:newUser.email,
        }
    })
    res.status(201).json({
        message:"User Created"
    })
    }catch(err){
        next(err);
    }
}

export const login =async (req,res,next)=>{
    try{
        const {email,password} = req.body;

        console.log("Keys are :", Object.keys(prisma))
        
        const user = await prisma.user.findFirst({
            where:{
                email,
            }
        })

        if(!user) return res.status(400).json({
            message:"Invalid Credentials"
        })

        const match = await comparePassword(password,user.password);
        if(!match) return res.status(400).json({
            message:"Wrong password"
        })

        const accessToken = generateAccessToken({id:user.id,email:user.email});
        const refreshToken = generateRefreshToken();


        await prisma.token.create({
            data:{
                token:refreshToken,
                userId:user.id,
                expiresAt:new Date(Date.now()+1000*60*60*24*7)
            }
        })

        await sendUserActivity({
            userId:user.id,
            type:'USER_LOGIN',
            timestamp:new Date(),
            metadata: {ip:req.ip},
            retryCount:0
        });

        res.json({accessToken,refreshToken});
    }catch(err){
        next(err);
    }
}

export const refresh= async(req,res,next)=>{
    try{
        const {refreshToken} = req.body;

        const found = await prisma.token.findUnique({
            where:{
                token:refreshToken
            }
        })

        if(!found || found.expiresAt < new Date()){
            return res.status(401).json({message:"Invalid or expired refresh token"});
        }

        const accessToken = generateAccessToken({id:found.userId});

        res.json({accessToken});
    }catch(err){
        next(err);
    }
}

export const logout = async (req,res,next) =>{
    try{
        const {refreshToken} = req.body;

        await prisma.token.delete({
            where:{
                token:refreshToken
            }
        })

        res.json({
            message:"Logged Out"
        })
    }catch(err){
        next(err);
    }
}