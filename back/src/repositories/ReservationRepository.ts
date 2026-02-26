import { table } from "console";
import { AppDataSource } from "../config/data-source";
import { Reservation, ReservationStatus } from "../entities/Reservation";

export const ReservationRepository = AppDataSource.getRepository(Reservation).extend({

    findAllReservations() {
        return this.find({ relations: ["table", "shift"] });
    },

    findById(id: number) {
        return this.findOne({ where: { id }, relations: ["table", "shift"] });
    },

    // busca si ya existe una reserva confirmed para esa mesa en ese turno
    findActiveByTableAndShift(tableId: number, shiftId: number) {
        return this.findOne({
            where: { table: { id: tableId }, shift: { id: shiftId }, status: ReservationStatus.CONFIRMED, },
            relations: ["table", "shift"],
        });
    },

    createReservation(data: { 
        customerName: string;
        partySize: number; 
        status: ReservationStatus; 
        tableId: number; 
        shiftId: number 
    }) {
        const reservation = this.create({
            customerName: data.customerName,
            partySize: data.partySize,
            status: data.status,
            table: { id: data.tableId },
            shift: { id: data.shiftId },
        });
        return this.save(reservation);

    },

    updateReservation(reservation: Reservation) {
        return this.save(reservation);  
    },
});