import { Request, Response, NextFunction } from "express";
import { ReservationService } from "../services/Reservation.services";

export const ReservationController = {
    async getAllReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const reservations = await ReservationService.getAllReservations();
            res.json(reservations);
        } catch (error) {
            next(error);
        }   
    },

    async getReservationById(req: Request, res: Response, next: NextFunction) {
        try {
            const reservation = await ReservationService.getReservationById(Number(req.params.id));
            res.json(reservation);
        } catch (error) {
            next(error);
        }
    },

    async createReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const { customerName, partySize, tableId, shiftId } = req.body;
            if (!customerName || !partySize || !tableId || !shiftId) {
                return res.status(400).json({ message: "Faltan campos obligatorios: customerName, partySize, tableId, shiftId" });
            }
            const newReservation = await ReservationService.createReservation(customerName, partySize, tableId, shiftId);
            res.status(201).json(newReservation);
        } catch (error) {
            next(error);
        }
    },

    async cancelReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedReservation = await ReservationService.cancelReservation(Number(req.params.id));
            res.json(updatedReservation);
        } catch (error) {
            next(error);
        }
    },
};