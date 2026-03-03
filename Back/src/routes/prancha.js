import { Router } from 'express';
import { getPrancha } from '../controller/pranchasController';
const router = Router();

router.get('/pranchas', getPrancha);

export default router;