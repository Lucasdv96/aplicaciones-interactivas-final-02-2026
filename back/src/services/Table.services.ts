import { TableRepository } from "../repositories/TableRepository";  
import { TableStatus } from "../entities/Table";
import { Table } from "../entities/Table";

export const TableService = {

    async getAllTables() {
        return TableRepository.findAll();
    },
    
    async getTableById(id: number): Promise<Table> {
        const table = await TableRepository.findById(id);
        if (!table) {
            throw { status: 404, message: `Mesa con id ${id} no encontrada` };
        }
        return table;
    },

    async createTable(number: number, capacity: number, status: TableStatus = TableStatus.AVAILABLE) {
      const existingTable = await TableRepository.findByNumber(number);
      if (existingTable) {
          throw { status: 400, message: `Ya existe una mesa con el número ${number}` };
      }  
      if (capacity <= 0) {
          throw { status: 400, message: `La capacidad debe ser mayor a 0` };
      }
      return TableRepository.createTable({number, capacity, status});
    },

    async updateTable(id: number, data: Partial<{number: number, capacity: number, status: TableStatus}>) {
        const table = await this.getTableById(id);
        if (data.number && data.number !== table.number) {
            const existingTable = await TableRepository.findByNumber(data.number);
            if (existingTable) {
                throw { status: 400, message: `Ya existe una mesa con el número ${data.number}` };
            }
        }
        if (data.capacity !== undefined && data.capacity <= 0) {
            throw { status: 400, message: `La capacidad debe ser mayor a 0` };
        }
        Object.assign(table, data);
        return TableRepository.updateTable(table);
    }
}