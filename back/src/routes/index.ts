import { Router } from "express";
import { healthcheckRouter } from "./healthcheck";
import tableRoutes from "./TableRoutes";
import shiftRoutes from "./ShiftRoutes";
import reservationRoutes from "./ReservationRoutes";
import reportRoutes from "./ReportRoutes";

export const router = Router();

router.use(healthcheckRouter);
router.use("/tables", tableRoutes);
router.use("/shifts", shiftRoutes);
router.use("/reservations", reservationRoutes);
router.use("/reports", reportRoutes);



