import { Router } from 'express';
import { adicionarPrancha, editarPrancha, excluirPrancha, getPrancha } from '../controller/pranchasController.js';
const router = Router();

router.get('/pranchas', getPrancha);
router.post('/pranchas', adicionarPrancha);
router.patch('/pranchas/:id', editarPrancha);
router.delete('/pranchas/:id', excluirPrancha);

export default router;