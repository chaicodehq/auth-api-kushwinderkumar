import { Router } from 'express';
import { listUsers, getUser, deleteUser } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = Router();

router.use(authenticate);
router.use(requireRole('admin'));

router.get('/', listUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;
