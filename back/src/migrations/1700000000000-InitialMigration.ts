import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1700000000000 implements MigrationInterface {
  name = "InitialMigration1700000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear enum de status para Table
    await queryRunner.query(`
      CREATE TYPE "public"."table_status_enum" AS ENUM ('AVAILABLE', 'OUT_OF_SERVICE')
    `);

    // Crear tabla Table
    await queryRunner.query(`
      CREATE TABLE "table" (
        "id"       SERIAL NOT NULL,
        "number"   integer NOT NULL,
        "capacity" integer NOT NULL,
        "status"   "public"."table_status_enum" NOT NULL,
        CONSTRAINT "UQ_table_number" UNIQUE ("number"),
        CONSTRAINT "PK_table" PRIMARY KEY ("id")
      )
    `);

    // Crear tabla Shift
    await queryRunner.query(`
      CREATE TABLE "shift" (
        "id"        SERIAL NOT NULL,
        "date"      character varying NOT NULL,
        "startTime" character varying NOT NULL,
        "endTime"   character varying NOT NULL,
        CONSTRAINT "PK_shift" PRIMARY KEY ("id")
      )
    `);

    // Crear enum de status para Reservation
    await queryRunner.query(`
      CREATE TYPE "public"."reservation_status_enum" AS ENUM ('CONFIRMED', 'CANCELLED')
    `);

    // Crear tabla Reservation con FK a Table y Shift
    await queryRunner.query(`
      CREATE TABLE "reservation" (
        "id"           SERIAL NOT NULL,
        "customerName" character varying NOT NULL,
        "partySize"    integer NOT NULL,
        "status"       "public"."reservation_status_enum" NOT NULL,
        "createdAt"    TIMESTAMP NOT NULL DEFAULT now(),
        "tableId"      integer,
        "shiftId"      integer,
        CONSTRAINT "PK_reservation" PRIMARY KEY ("id")
      )
    `);

    // Agregar Foreign Keys
    await queryRunner.query(`
      ALTER TABLE "reservation"
        ADD CONSTRAINT "FK_reservation_table"
        FOREIGN KEY ("tableId") REFERENCES "table"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "reservation"
        ADD CONSTRAINT "FK_reservation_shift"
        FOREIGN KEY ("shiftId") REFERENCES "shift"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_reservation_shift"`);
    await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_reservation_table"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TYPE "public"."reservation_status_enum"`);
    await queryRunner.query(`DROP TABLE "shift"`);
    await queryRunner.query(`DROP TABLE "table"`);
    await queryRunner.query(`DROP TYPE "public"."table_status_enum"`);
  }
}
