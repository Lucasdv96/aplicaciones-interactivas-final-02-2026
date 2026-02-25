import { Request, Response, NextFunction } from "express";
import { ShiftService } from "../services/Shift.services";

export const ShiftController = {
  async getAllShifts(req: Request, res: Response, next: NextFunction) {
    try {
      const shifts = await ShiftService.getAllShifts();
      res.json(shifts);
    } catch (error) {
      next(error);
    }
  },

  async getShiftById(req: Request, res: Response, next: NextFunction) {
    try {
        const shift = await ShiftService.getShiftById(Number(req.params.id));
            res.json(shift);
        } catch (error) {
            next(error);
        }

    },

    async createShift(req: Request, res: Response, next: NextFunction) {
        try { 
            const { date, startTime, endTime } = req.body;
            if (!date || !startTime || !endTime) {
                return res.status(400).json({ message: "Faltan campos obligatorios: date, startTime, endTime" });
            }   
            const newShift = await ShiftService.createShift(date, startTime, endTime);
            res.status(201).json(newShift); 
        } catch (error) {
            next(error);    
        }
    },

    async updateShift(req: Request, res: Response, next: NextFunction) {    
        try {
            const { id } = req.params;
            const { date, startTime, endTime } = req.body;
            const updatedShift = await ShiftService.updateShift(Number(id), { date, startTime, endTime });
            res.json(updatedShift);
        } catch (error) {
            next(error);
        }   
    },

    async deleteShift(req: Request, res: Response, next: NextFunction) {
        try {
            await ShiftService.deleteShift(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};
