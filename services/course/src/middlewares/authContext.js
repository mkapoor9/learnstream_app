export const authContext = (req, res, next) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  req.user = { id: userId };
  next();
};

export const authorize = (roles) =>(req,res,next)=>{
  const role = req.headers["x-user-role"];

  console.log("INSIDE COURSE AUTHORIZE")

  if(!roles.includes(role)){
    return res.status(403).json({message:"Forbidden"})
  }

  next();
}
