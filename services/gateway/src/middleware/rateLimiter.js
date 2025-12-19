import redis from "../redis/redisClient.js";

export const rateLimiter = (limit=100,windowMs = 60*1000) =>{
    return async (req,res,next)=>{
        try{
            const userKey = req.user?.id || req.ip;
            const key = `rate:${userKey}`

            const now = Date.now();

            await redis.zRemRangeByScore(key,0,now-windowMs);

            const count = await redis.zCard(key);

            if(count>=limit){
                return res.status(429).json({
                    message:"Too many requests, slow down"
                })
            }

            await redis.zAdd(key,[{
                score:now,
                value:`${now}`
            }])

            await redis.expire(key,Math.ceil(windowMs/1000));

            next();

        }catch(e){
            console.error("Rate Limitter Error: ",err);
            next();
        }
    }
}