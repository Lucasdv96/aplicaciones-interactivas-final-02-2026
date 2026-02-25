import { Request, Response, NextFunction } from "express";
import { ReportService } from "../services/Report.services";

export const ReportController = {
  async getOccupancy(req: Request, res: Response, next: NextFunction) {
    try {
      const { date } = req.query;
      if (!date) {
        return res.status(400).json({ message: "El parámetro date es requerido" });
      }
      const report = await ReportService.getOccupancyByDate(date as string);
      res.json(report);
    } catch (error) {
      next(error);
    }
  },
};