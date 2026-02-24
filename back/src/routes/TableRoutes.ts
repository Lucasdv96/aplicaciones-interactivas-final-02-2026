import { Router } from 'express';
import { TableController } from '../controllers/TableController';

const router = Router();

router.get('/tables', TableController.getAllTables);
router.get('/tables/:id', TableController.getTableById);
router.post('/tables', TableController.createTable);
router.patch('/tables/:id', TableController.updateTable);

export default router;

