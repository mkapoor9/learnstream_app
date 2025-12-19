import { Router } from "express";
import { getUserActivity } from "../controllers/activityController.js";

const router = Router();

router.get("/:userId",getUserActivity);
export default router;