import { Router } from "express";
import {
  createLesson,
  getLessonByCourse,
  completeLesson,
  getCourseProgress,
  getLessonById,
} from "../controllers/contentController.js";
import { authContext,authorize } from "../middlewares/authContext.js";

const router = Router();

router.use(authContext);

router.post(
  "/lesson",
  authorize(["INSTRUCTOR","ADMIN"]),
  createLesson);
router.get("/course/:courseId", getLessonByCourse);
router.post("/lesson/:lessonId/complete", completeLesson);
router.get("/course/:courseId/progress", getCourseProgress);
router.get('/lesson/:lessonId',getLessonById)

export default router;
