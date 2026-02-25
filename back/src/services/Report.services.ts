import { TableRepository } from "../repositories/TableRepository";
import { ReportRepository } from "../repositories/reportRepository";

export const ReportService = {
  async getOccupancyByDate(date: string) {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw { status: 400, message: "Formato de fecha inválido, usar YYYY-MM-DD" };
    }

    const totalTables = await TableRepository.count();
    const reservedTables = await ReportRepository.countReservedTablesByDate(date);
    const availableTables = totalTables - reservedTables;
    const occupancyPercentage =
      totalTables === 0 ? 0 : Math.round((reservedTables / totalTables) * 100 * 100) / 100;

    return {
      date,
      totalTables,
      reservedTables,
      availableTables,
      occupancyPercentage,
    };
  },
};