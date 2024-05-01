import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1714536059918 implements MigrationInterface {
    name = 'Migrate1714536059918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_members_user" DROP CONSTRAINT "FK_427107c650638bcb2f1e167d2e5"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "memberIds"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "group" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "group_members_user" ADD CONSTRAINT "FK_427107c650638bcb2f1e167d2e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_members_user" DROP CONSTRAINT "FK_427107c650638bcb2f1e167d2e5"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "group" ADD "createdAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group" ADD "memberIds" integer array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "group_members_user" ADD CONSTRAINT "FK_427107c650638bcb2f1e167d2e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
