import jwt from "jsonwebtoken";
import axios from 'axios';

export const verifyJWT = async(req,res,next)=>{
    const excluded = ['/auth/login','auth/signup'];

    if(excluded.includes(req.path)) return next();

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error:"Token missing"});
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try{
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        req.headers["x-user-id"] = decoded.id;
        req.headers["x-user-email"] = decoded.email;
        next();

    }catch(e){
        return res.status(403).json({
            message:"Invalid Token",
        })
    }
}
/*
export const authorize = (allowedRoles=[])=>{
    return (req,res,next)=>{
        const role = req.headers["x-user-role"];

        if(!allowedRoles.includes(role)){
           return res.status(403).json({message:"Forbidden"})
        }

        next();
    }
}*/

export const attachUserContext = async (req, res, next) => {
  console.log("INSIDE ATTACH USER")
  try {
    const response = await axios.get(
      "http://user:4002/profile",
      {
        headers: {
          "x-user-id": req.user.id,
        },
      }
    );

    const user = response.data;

    // Gateway-injected trusted headers
    req.headers["x-user-id"] = user.id;
    req.headers["x-user-email"] = user.email;
    req.headers["x-user-role"] = user.role;

    console.log("USER ROLES IS :",user.role)

    next();
  } catch (err) {
    console.log("Attach user context failed:", err.response?.data || err.message);
    return res.status(401).json({ message: "User context error" });
  }
};