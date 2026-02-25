import { create } from "domain";
import { AppDataSource } from "../config/data-source";
import { Shift } from "../entities/Shift";

export const ShiftRepository = AppDataSource.getRepository(Shift).extend({
  findAllShifts() {
    return this.find();
  },

  findById(id: number) {
    return this.findOneBy({ id });
  },

  findByDate(date: string, startTime: string, endTime: string) {
    return this.findOne({
      where: {
        date,
        startTime,
        endTime,
      },
    });
  },

  createShift(data: { date: string; startTime: string; endTime: string }) {
    const shift = this.create(data);
    return this.save(shift);
  },

  updateShift(shift: Shift) {
    return this.save(shift);
  },

  deleteShift(id: number) {
    return this.delete(id);
  }
});