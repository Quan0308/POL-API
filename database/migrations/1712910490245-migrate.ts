import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712910490245 implements MigrationInterface {
    name = 'Migrate1712910490245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firebaseUID" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firebaseUID" DROP NOT NULL`);
    }

}
