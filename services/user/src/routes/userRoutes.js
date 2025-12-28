import {Router} from 'express'
import { getProfile, updateProfile } from "../controllers/userController.js";
import { authContext } from "../middlewares/authContext.js";

const router = Router();

router.use(authContext);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;
