import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712851444563 implements MigrationInterface {
    name = 'Migrate1712851444563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ownerId" integer NOT NULL, "memberIds" integer array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "otp" character varying NOT NULL, "validUntil" TIMESTAMP NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_members_user" ("groupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_7170c9a27e7b823d391d9e11f2e" PRIMARY KEY ("groupId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bfa303089d367a2e3c02b002b8" ON "group_members_user" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_427107c650638bcb2f1e167d2e" ON "group_members_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_af997e6623c9a0e27c241126988" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_members_user" ADD CONSTRAINT "FK_bfa303089d367a2e3c02b002b8f" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_members_user" ADD CONSTRAINT "FK_427107c650638bcb2f1e167d2e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_members_user" DROP CONSTRAINT "FK_427107c650638bcb2f1e167d2e5"`);
        await queryRunner.query(`ALTER TABLE "group_members_user" DROP CONSTRAINT "FK_bfa303089d367a2e3c02b002b8f"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_af997e6623c9a0e27c241126988"`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-25 14:12:19.809'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '2024-03-25 14:12:19.809'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-25 14:12:19.809'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-25 14:12:19.809'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-25 14:12:19.809'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_427107c650638bcb2f1e167d2e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bfa303089d367a2e3c02b002b8"`);
        await queryRunner.query(`DROP TABLE "group_members_user"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
