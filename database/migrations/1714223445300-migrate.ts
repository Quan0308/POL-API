import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1714223445300 implements MigrationInterface {
    name = 'Migrate1714223445300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "frame" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "font" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "font"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "frame"`);
    }

}
