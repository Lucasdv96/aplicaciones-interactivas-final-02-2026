import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { Table, TableStatus } from "./entities/Table";
import { Shift } from "./entities/Shift";
import { Reservation, ReservationStatus } from "./entities/Reservation";

async function seed() {
    await AppDataSource.initialize();
    console.log("📦 Conectado a la base de datos. Iniciando seed...");

    const tableRepo = AppDataSource.getRepository(Table);
    const shiftRepo = AppDataSource.getRepository(Shift);
    const reservationRepo = AppDataSource.getRepository(Reservation);

    // ─── MESAS ─────────────────────────────────────────────────────────────────
    const tablesData = [
        { number: 1, capacity: 2, status: TableStatus.AVAILABLE },
        { number: 2, capacity: 4, status: TableStatus.AVAILABLE },
        { number: 3, capacity: 6, status: TableStatus.AVAILABLE },
        { number: 4, capacity: 8, status: TableStatus.OUT_OF_SERVICE }, // al menos una OUT_OF_SERVICE
    ];

    const savedTables: Table[] = [];
    for (const data of tablesData) {
        let table = await tableRepo.findOne({ where: { number: data.number } });
        if (!table) {
            table = tableRepo.create(data);
            await tableRepo.save(table);
            console.log(`✅ Mesa ${data.number} creada`);
        } else {
            console.log(`⏩ Mesa ${data.number} ya existe, omitiendo`);
        }
        savedTables.push(table);
    }

    // ─── TURNOS ────────────────────────────────────────────────────────────────
    // 3 turnos para hoy
    const today = new Date().toISOString().split("T")[0];

    const shiftsData = [
        { date: today, startTime: "12:00", endTime: "14:00" },
        { date: today, startTime: "18:00", endTime: "20:00" },
        { date: today, startTime: "20:00", endTime: "22:00" },
    ];

    const savedShifts: Shift[] = [];
    for (const data of shiftsData) {
        let shift = await shiftRepo.findOne({
            where: { date: data.date, startTime: data.startTime, endTime: data.endTime },
        });
        if (!shift) {
            shift = shiftRepo.create(data);
            await shiftRepo.save(shift);
            console.log(`✅ Turno ${data.startTime}-${data.endTime} creado`);
        } else {
            console.log(`⏩ Turno ${data.startTime}-${data.endTime} ya existe, omitiendo`);
        }
        savedShifts.push(shift);
    }

    // ─── RESERVAS ──────────────────────────────────────────────────────────────
    // Usamos mesa 1 y mesa 2 (AVAILABLE), turno de 18:00 y 20:00
    const reservationsData = [
        {
            customerName: "Juan Pérez",
            partySize: 2,
            status: ReservationStatus.CONFIRMED,
            table: savedTables[0], // mesa 1
            shift: savedShifts[1], // 18:00-20:00
        },
        {
            customerName: "María García",
            partySize: 3,
            status: ReservationStatus.CANCELLED,
            table: savedTables[1], // mesa 2
            shift: savedShifts[1], // 18:00-20:00 (puede coexistir porque está CANCELLED)
        },
    ];

    for (const data of reservationsData) {
        // Idempotente: chequeamos por customerName + table + shift + status
        const existing = await reservationRepo.findOne({
            where: {
                customerName: data.customerName,
                table: { id: data.table.id },
                shift: { id: data.shift.id },
                status: data.status,
            },
            relations: ["table", "shift"],
        });
        if (!existing) {
            const reservation = reservationRepo.create(data);
            await reservationRepo.save(reservation);
            console.log(`✅ Reserva para ${data.customerName} (${data.status}) creada`);
        } else {
            console.log(`⏩ Reserva para ${data.customerName} ya existe, omitiendo`);
        }
    }

    console.log("\n🎉 Seed completado exitosamente");
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error("❌ Error en el seed:", err);
    process.exit(1);
});