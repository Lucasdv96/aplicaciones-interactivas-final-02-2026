// TODO: Define Table entity with TypeORM
// Attributes: id, number (unique), capacity, status (AVAILABLE | OUT_OF_SERVICE)

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: number;

  @Column()
  capacity: number;

  @Column({ type: 'enum', enum: TableStatus })
  status: TableStatus;
}

