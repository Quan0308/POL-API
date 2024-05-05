// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Migrate1714706033660 implements MigrationInterface {
//     name = 'Migrate1714706033660'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "group_members_user" DROP CONSTRAINT "FK_427107c650638bcb2f1e167d2e5"`);
//         await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "memberIds"`);
//         await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "createdAt"`);
//         await queryRunner.query(`ALTER TABLE "post" ADD "frame" integer NOT NULL DEFAULT '0'`);
//         await queryRunner.query(`ALTER TABLE "post" ADD "font" integer NOT NULL DEFAULT '0'`);
//         await queryRunner.query(`ALTER TABLE "group" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "created_at" SET DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT now()`);
//         await queryRunner.query(`ALTER TABLE "group_members_user" ADD CONSTRAINT "FK_427107c650638bcb2f1e167d2e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "group_members_user" DROP CONSTRAINT "FK_427107c650638bcb2f1e167d2e5"`);
//         await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" DROP DEFAULT`);
//         await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" DROP DEFAULT`);
//         await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "created_at" DROP DEFAULT`);
//         await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "created_at"`);
//         await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "font"`);
//         await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "frame"`);
//         await queryRunner.query(`ALTER TABLE "group" ADD "createdAt" TIMESTAMP NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "group" ADD "memberIds" integer array NOT NULL DEFAULT '{}'`);
//         await queryRunner.query(`ALTER TABLE "group_members_user" ADD CONSTRAINT "FK_427107c650638bcb2f1e167d2e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

// }
