import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Table } from "../entities/Table";
import { Shift } from "../entities/Shift";
import { Reservation } from "../entities/Reservation";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "restaurant",
  synchronize: false,
  logging: false,
  entities: [Table, Shift, Reservation],
  migrations: ["src/migrations/*.ts"],
});
