export interface Table {
    id: number;
    number: number;
    capacity: number;
    status: 'AVAILABLE' | 'OCCUPIED' | 'OUT_OF_SERVICE';

}

export interface Shift {
    id: number;
    date: string; // YYYY-MM-DD
    startTime: string; // HH:mm
    endTime: string; // HH:mm
}

export interface Reservation {
    id: number;
    customerName: string;
    partySize: number;
    status: 'CONFIRMED' | 'CANCELLED';
    table: Table;
    shift: Shift;
}

export interface OccupancyReport {
    totalTables: number;
    reservedTables: number;
    availableTables: number;
    occupancyPercentage: number;

}

