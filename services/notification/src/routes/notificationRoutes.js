import {Router} from 'express';
import { getNotifications, markAsRead, unreadCount } from '../controllers/notificationController.js';
import { authContext } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authContext)

router.get('/',getNotifications);
router.get('/unread-count',unreadCount);
router.put('/:id/read',markAsRead);

export default router;