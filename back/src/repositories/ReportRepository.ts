import { AppDataSource } from "../config/data-source";
import { Reservation, ReservationStatus } from "../entities/Reservation";

export const ReportRepository = AppDataSource.getRepository(Reservation).extend({
  // Cuenta mesas con al menos una reserva CONFIRMED en una fecha dada
  countReservedTablesByDate(date: string): Promise<number> {
    return this.createQueryBuilder("reservation")
      .innerJoin("reservation.shift", "shift")
      .where("shift.date = :date", { date })
      .andWhere("reservation.status = :status", { status: ReservationStatus.CONFIRMED })
      .select("COUNT(DISTINCT reservation.tableId)", "count")
      .getRawOne()
      .then((result) => parseInt(result?.count ?? "0", 10));
  },
});