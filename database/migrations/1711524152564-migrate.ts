import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1711524152564 implements MigrationInterface {
    name = 'Migrate1711524152564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "Avatar" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-27T07:22:32.783Z"'`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-27T07:22:32.784Z"'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-27T07:22:32.784Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-27T07:22:32.784Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-03-27T07:22:32.784Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '2024-03-26 07:41:27.75'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-26 07:41:27.75'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-26 07:41:27.75'`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-26 07:41:27.751'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-26 07:41:27.75'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "Avatar"`);
    }

}
