import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712669685504 implements MigrationInterface {
    name = 'Migrate1712669685504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "friendIds"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "friendIds" integer array NOT NULL DEFAULT '{}'`);
    }

}
