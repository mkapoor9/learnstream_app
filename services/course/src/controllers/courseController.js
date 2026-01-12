import prisma from "../db/prisma.js";
import { emitCourseEvent } from "../kafka/producer.js";

export const createCourse = async(req,res)=>{
    const {title,description} = req.body;

    const course = await prisma.course.findFirst({
        where :{
            title,
            description
        }
    })

    if(!course){
        await prisma.course.create({
            data:{
                title,
                description,
                createdBy:req.user.id
            }
        })
    }else{
        res.status(401).json({
            message:"Course already in the database"
        })
    }

    console.log(course)
    res.status(201).json({
        message:"Course Added"
    });
}

export const listCourses = async(req,res)=>{
    const courses = await prisma.course.findMany({
        orderBy :{createdAt:"desc"}
    })

    res.json(courses);
}

export const enrollCourse = async(req,res) =>{
    const {courseId} = req.params;

    const enrollment = await prisma.enrollment.create({
        data:{
            userId : req.user.id,
            courseId
        }
    })

    await emitCourseEvent({
        type:"COURSE_ENROLLED",
        userId:req.user.id,
        courseId
    })

    res.json(enrollment);
}

export const myCourses = async (req,res) =>{
    const courses = await prisma.enrollment.findMany({
        where:{userId:req.user.id},
        include :{course:true}
    })

    res.json(courses);
}