import prisma from "../db/prisma.js";

export const createLesson = async(req,res) =>{
    const {courseId , title , content , order} = req.body;

    const lesson = await prisma.lesson.create({
        data:{
            courseId,
             title,
            content,
            order
        }
    })

    res.json(lesson);
}

export const getLessonByCourse = async(req,res)=>{
    const {courseId} = req.params;

    const lessons = await prisma.lesson.findMany({
        where:{
            courseId
        },
        orderBy:{order:"asc"}
    })

    res.json(lessons);
}

export const getLessonById = async(req,res)=>{
    const {lessonId} = req.params;

    const lesson = await prisma.lesson.findUnique({
        where:{
            id:lessonId
        }
    })

    res.json(lesson);
}

export const completeLesson = async(req,res)=>{
    const {lessonId} = req.params;

    const progress = await prisma.lessonProgress.upsert({
        where:{
            userId_lessonId:{
                userId:req.user.id,
                lessonId,
            }
        },
        update:{
            completed:true
        },
        create:{
            userId:req.userId,
            lessonId,
            completed:true
        }
    })

     const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
    });

     const lessons = await prisma.lesson.findMany({
            where: { courseId: lesson.courseId },
            include: {
            progress: {
                where: { userId: req.userId },
            },
        },
    });

  const completed = lessons.filter(
    (l) => l.progress.length && l.progress[0].completed
  ).length;

   const percentage = Math.round((completed / lessons.length) * 100);

   await emitContentEvent({
    type: "COURSE_PROGRESS_UPDATED",
    userId: req.userId,
    courseId: lesson.courseId,
    completed,
    total: lessons.length,
    percentage,
  });

    res.json(progress);
}

export const getCourseProgress = async(req,res)=>{
    const {courseId} = req.params;

    const lessons = await prisma.lesson.findMany({
        where:{
            courseId,
        },
        include:{
            progress:{
                where:{
                    userId:req.userId
                }
            }
        }
    })

    const completed = lessons.filter(
        (l)=>l.progress.length && l.progress[0].completed
    ).length;

    res.json({
        total:lessons.length,
        completed,
        percentage:
            lessons.length === 0
            ? 0
            : Math.round((completed/lessons.length)*100)
        
    })
}

