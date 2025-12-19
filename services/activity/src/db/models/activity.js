import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
    {
        userId:String,
        type:String,
        metadata:Object,
        timestamp:{
            type:Date,
            default:Date.now(),
        }
    },
    {timestamps:true}
)

export default mongoose.model("Activity",ActivitySchema);