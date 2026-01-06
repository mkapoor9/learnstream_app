import { Router } from "express";
import {
  createLesson,
  getLessonByCourse,
  completeLesson,
  getCourseProgress,
} from "../controllers/contentController.js";
import { authContext } from "../middlewares/authContext.js";

const router = Router();

router.use(authContext);

router.post("/lesson", createLesson);
router.get("/course/:courseId", getLessonByCourse);
router.post("/lesson/:lessonId/complete", completeLesson);
router.get("/course/:courseId/progress", getCourseProgress);

export default router;
