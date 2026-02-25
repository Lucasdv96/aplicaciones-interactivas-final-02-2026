import { Router } from "express";
import { ReportController } from "../controllers/ReportController";

const router = Router();

router.get("/occupancy", ReportController.getOccupancy);

export default router;