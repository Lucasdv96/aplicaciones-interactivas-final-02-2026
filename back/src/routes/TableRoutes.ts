import { Router } from 'express';
import { TableController } from '../controllers/TableController';

const router = Router();

router.get('/', TableController.getAllTables);
router.get('/:id', TableController.getTableById);
router.post('/', TableController.createTable);
router.patch('/:id', TableController.updateTable);

export default router;

