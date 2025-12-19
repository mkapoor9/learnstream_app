import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) =>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m",
    })
}

export const generateRefreshToken = () =>{
    return crypto.randomUUID() + crypto.randomUUID();
}

export const verifyAccessToken = (token) =>{
    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
}