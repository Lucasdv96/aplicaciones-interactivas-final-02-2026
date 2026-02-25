import { ReservationRepository } from "../repositories/ReservationRepository";
import { ReservationStatus } from "../entities/Reservation";
import { TableRepository } from "../repositories/TableRepository";
import { ShiftRepository } from "../repositories/ShiftRepository";
import { TableStatus } from "../entities/Table";
import { table } from "console";

export const ReservationService = {

    async getAllReservations() {
        return ReservationRepository.findAllReservations();
    },

    async getReservationById(id: number): Promise<typeof import("../entities/Reservation").Reservation.prototype & object> {
        const reservation = await ReservationRepository.findById(id);
        if (!reservation) {
            throw { status: 404, message: `Reserva con id ${id} no encontrada` };
        }   
        return reservation;
    },

    async createReservation( customerName: string, partySize: number, tableId: number, shiftId: number ) {
        if (!customerName || !partySize || !tableId || !shiftId) {
            throw { status: 400, message: "customerName, partySize, tableId y shiftId son requeridos" };
        }

        if (partySize <= 0) {
            throw { status: 400, message: "partySize debe ser mayor a 0" };
        }

        //verificar que la mesa existe
        const table = await TableRepository.findById(tableId);
        if (!table) {
            throw { status: 404, message: `Mesa con id ${tableId} no encontrada` };
        }

        //verificar que la mesa no esta fuera de servicio
        if (table.status === TableStatus.OUT_OF_SERVICE) {
            throw { status: 400, message: `Mesa con id ${tableId} está fuera de servicio` };
        }   

        // verificar que el partySize no exceda la capacidad de la mesa
        if (partySize > table.capacity) {
            throw { status: 400, message: `partySize excede la capacidad de la mesa (${table.capacity})` };
        }

        //veriricar que el turno existe
        const shift = await ShiftRepository.findById(shiftId);
        if (!shift) {
            throw { status: 404, message: `Turno con id ${shiftId} no encontrado` };
        }

        // verificar que la mesa no tenga una reserva confirmada para ese turno
        const existingReservation = await ReservationRepository.findActiveByTableAndShift(tableId, shiftId);
        if (existingReservation) {
            throw { status: 400, message: `La mesa con id ${tableId} ya tiene una reserva confirmada para el turno con id ${shiftId}` };
        }

        return ReservationRepository.createReservation({ customerName, partySize, status: ReservationStatus.CONFIRMED, tableId, shiftId });
    },

    async cancelReservation(id: number) {
        const reservation = await this.getReservationById(id);
        if (!reservation) {
            throw { status: 404, message: `Reserva con id ${id} no encontrada` };
        }
        if (reservation.status === ReservationStatus.CANCELLED) {
            throw { status: 400, message: `La reserva con id ${id} ya está cancelada` };
        }
        reservation.status = ReservationStatus.CANCELLED;
        return ReservationRepository.updateReservation(reservation);
    }

};
