import { Router } from "express";
import {
    createCourse,
    myCourses,
    listCourses,
    enrollCourse
} from '../controllers/courseController.js'
import { authContext } from "../middlewares/authContext.js";

const router = Router();

router.use(authContext);

router.post('/',createCourse);
router.get('/',listCourses);
router.post('/:courseId/enroll',enrollCourse);
router.get('/me',myCourses);

export default router;