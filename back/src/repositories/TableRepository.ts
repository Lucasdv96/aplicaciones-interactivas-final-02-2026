import { AppDataSource } from "../config/data-source";
import { Table, TableStatus } from "../entities/Table";

export const TableRepository = AppDataSource.getRepository(Table).extend({
    // Aquí agregamos métodos personalizados 
    findAll() {
        return this.find();
    },

    findById(id: number) {
        return this.findOne({ where: { id }});
    },

    findByNumber(number: number) {
        return this.findOne({ where: { number }});
    },

    createTable(data: {number: number, capacity: number, status: TableStatus}) {
        const table = this.create(data);
        return this.save(table);
    },

    updateTable(table: Table) {
        return this.save(table);
    }   
});