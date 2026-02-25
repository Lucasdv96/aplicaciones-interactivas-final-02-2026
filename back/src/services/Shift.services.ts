import { ShiftRepository } from "../repositories/ShiftRepository";
import { Shift } from "../entities/Shift";

//Valida Formato HH:MM
function isValidTime(time: string): boolean {
    return /^\d{2}:\d{2}$/.test(time);
}
// Valida formato YYYY-MM-DD
function isValidDate(date: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export const ShiftService = {

    async getAllShifts() {
        return ShiftRepository.findAllShifts();
    },

    async getShiftById(id: number): Promise<Shift> {
        const shift = await ShiftRepository.findById(id);
        if (!shift) {
            throw { status: 404, message: `Turno con id ${id} no encontrado` };
        }
        return shift;
    },

    async createShift( date: string, startTime: string, endTime: string ) {
        if (!isValidDate(date)) {
            throw { status: 400, message: "Fecha debe tener formato YYYY-MM-DD" };
        }
        if (!isValidTime(startTime) || !isValidTime(endTime)) {
            throw { status: 400, message: "Hora debe tener formato HH:MM" };
        }
        if (startTime >= endTime) {
            throw { status: 400, message: "Hora de inicio debe ser menor que hora de fin" };
        }

        const existingShift = await ShiftRepository.findByDate(date, startTime, endTime);
        if (existingShift) {
            throw { status: 400, message: "Ya existe un turno para esa fecha y horario" };
        }

        return ShiftRepository.createShift({ date, startTime, endTime });
    },

    async updateShift(id: number,
        data: Partial<{ date: string; startTime: string; endTime: string }>) {
        const shift = await this.getShiftById(id);
        if (data.date && !isValidDate(data.date)) {
            throw { status: 400, message: "Fecha debe tener formato YYYY-MM-DD" };
        }
        if (data.startTime && !isValidTime(data.startTime)) {
            throw { status: 400, message: "Hora de inicio debe tener formato HH:MM" };
        }
        if (data.endTime && !isValidTime(data.endTime)) {
            throw { status: 400, message: "Hora de fin debe tener formato HH:MM" };
        }

         const newStartTime = data.startTime ?? shift.startTime;
         const newEndTime = data.endTime ?? shift.endTime;
        if (newStartTime >= newEndTime) {
            throw { status: 400, message: "Hora de inicio debe ser menor que hora de fin" };
        }

         Object.assign(shift, data);
        return ShiftRepository.updateShift(shift);
    },

    async deleteShift(id: number) {
        await this.getShiftById(id); // Verifica que el turno exista
        return ShiftRepository.deleteShift(id);
    }
};

        


