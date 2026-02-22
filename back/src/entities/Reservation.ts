// TODO: Define Reservation entity with TypeORM
// Attributes: id, customerName, partySize, status (CONFIRMED | CANCELLED), createdAt
// Relations: belongs to a Table, belongs to a Shift

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Table } from './Table';
import { Shift } from './Shift';
export enum ReservationStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;   
    @Column()
    customerName: string;
    @Column()
    partySize: number;
    @Column({ type: 'enum', enum: ReservationStatus })
    status: ReservationStatus;
    @CreateDateColumn()
    createdAt: Date;
    @ManyToOne(() => Table, (table) => table.id)
    table: Table;
    @ManyToOne(() => Shift, (shift) => shift.id)
    shift: Shift;
}