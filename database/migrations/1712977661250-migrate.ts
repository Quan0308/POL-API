import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712977661250 implements MigrationInterface {
    name = 'Migrate1712977661250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "createdAt" TO "created_at"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "createdAt" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "created_at" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "created_at" TO "createdAt"`);
    }

}
