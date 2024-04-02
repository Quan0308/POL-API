import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712052431768 implements MigrationInterface {
    name = 'Migrate1712052431768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '2024-03-29 09:59:44.488'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 09:59:44.488'`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 09:59:44.488'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 09:59:44.488'`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 09:59:44.488'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 09:59:44.488'`);
    }

}
