import { Request, Response, NextFunction  } from "express";
import { TableService } from "../services/Table.services";

export const TableController = {
    async getAllTables(req: Request, res: Response, next: NextFunction) {
        try {
            const tables = await TableService.getAllTables();
            res.json(tables);
        } catch (error) {
            next(error);
        }
    },

    async getTableById(req: Request, res: Response, next: NextFunction) {
        try {
            const table = await TableService.getTableById(Number(req.params.id));
            res.json(table);
        } catch (error) {
            next(error);
        }   
    },

    async createTable(req: Request, res: Response, next: NextFunction) {
        try {
            const { number, capacity, status } = req.body;
            if (!number || !capacity) {
                return res.status(400).json({ message: "Número y capacidad son requeridos" });
            }
            const newTable = await TableService.createTable(number, capacity, status);
            res.status(201).json(newTable);
        } catch (error) {
            next(error);
        }   
    },

    async updateTable(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { number, capacity, status } = req.body;
            const updatedTable = await TableService.updateTable(Number(id), { number, capacity, status });
            res.json(updatedTable);
        } catch (error) {
            next(error);
        }
    }
}
