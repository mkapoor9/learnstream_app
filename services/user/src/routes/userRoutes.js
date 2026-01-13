import {Router} from 'express'
import { getProfile, promoteUser, updateProfile } from "../controllers/userController.js";
import { authContext } from "../middlewares/authContext.js";

const router = Router();

router.use(authContext);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/role",promoteUser)

export default router;
