import { Router } from "express";
import { ReservationController } from "../controllers/ReservationController";

const router = Router();

router.get("/", ReservationController.getAllReservations);
router.get("/:id", ReservationController.getReservationById);
router.post("/", ReservationController.createReservation);
router.patch("/:id/cancel", ReservationController.cancelReservation);

export default router;