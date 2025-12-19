import activity from "../db/models/activity.js";

export const getUserActivity= async(req,res)=>{
    try{
        const {userId} = req.params;

        const activities = await activity.find({userId}).sort({
            timestamp:-1,
        })

        res.json({activities})
    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}