import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongo = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"activitydb"
        })
        console.log("MongoDB connected for activity service")
    }catch(err){
        console.log("MongoDB not connected: ",err);
        process.exit(1);
    }
}