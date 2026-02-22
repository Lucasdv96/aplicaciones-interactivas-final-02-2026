// TODO: Define Shift entity with TypeORM
// Attributes: id, date, startTime, endTime
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;
    @Column()
    date: string; // YYYY-MM-DD format
    @Column()
    startTime: string; // HH:MM format
    @Column()
    endTime: string; // HH:MM format
}   
