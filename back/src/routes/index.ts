import { Router } from "express";
import { healthcheckRouter } from "./healthcheck";

export const router = Router();

router.use(healthcheckRouter);
