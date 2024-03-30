import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1711706384369 implements MigrationInterface {
    name = 'Migrate1711706384369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "Avatar" TO "avatar"`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-29T09:59:44.488Z"'`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-29T09:59:44.488Z"'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-29T09:59:44.488Z"'`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-29T09:59:44.488Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-29T09:59:44.488Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-03-29T09:59:44.488Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '2024-03-29 07:13:28.985'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 07:13:28.985'`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 07:13:28.985'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 07:13:28.985'`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 07:13:28.985'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-29 07:13:28.985'`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "avatar" TO "Avatar"`);
    }

}
