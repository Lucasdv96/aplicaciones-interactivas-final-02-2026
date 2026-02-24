import { Router } from "express";
import { healthcheckRouter } from "./healthcheck";
import tableRoutes from "./TableRoutes";

export const router = Router();

router.use(healthcheckRouter);
router.use("/tables", tableRoutes);
