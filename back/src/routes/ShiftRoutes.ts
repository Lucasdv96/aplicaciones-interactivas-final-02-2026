import { Router } from "express";
import { ShiftController } from "../controllers/ShiftController";

const router = Router();

router.get("/", ShiftController.getAllShifts);
router.get("/:id", ShiftController.getShiftById);
router.post("/", ShiftController.createShift);
router.patch("/:id", ShiftController.updateShift);
router.delete("/:id", ShiftController.deleteShift);

export default router;