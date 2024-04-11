import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712851653908 implements MigrationInterface {
    name = 'Migrate1712851653908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "firebaseUID" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firebaseUID"`);
    }

}
