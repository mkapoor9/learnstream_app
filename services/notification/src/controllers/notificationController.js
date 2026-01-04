import prisma from "../db/prisma.js";

export const getNotifications = async (req,res)=>{
    const notifications = await prisma.notification.findMany({
        where:{
            userId:req.userId   
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    res.send(notifications);
}

export const markAsRead = async (req,res)=>{
    
    const {id} = req.params;

    const read = await prisma.notification.update({
        where:{
            userId:id
        },
        data:{
            read:true,
        }
    })

    res.json({success:true})
}

export const unreadCount = async (req,res)=>{
    
    const unread = await prisma.notification.count({
        where:{
            userId : req.userId,
            read:false
        }
    })

    res.json(unread);
}