import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1711438887633 implements MigrationInterface {
    name = 'Test1711438887633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_a8b2cbbb1ae9214a390ddc81657"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "commentsId"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "commentsAuthorId"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "commentsPostId"`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-26T07:41:27.750Z"'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-26T07:41:27.750Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-26T07:41:27.750Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-03-26T07:41:27.750Z"'`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT '"2024-03-26T07:41:27.751Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-26 07:38:45.901'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT '2024-03-26 07:38:45.901'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-26 07:38:45.901'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-26 07:38:45.901'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT '2024-03-26 07:38:45.901'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "commentsPostId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD "commentsAuthorId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD "commentsId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_a8b2cbbb1ae9214a390ddc81657" FOREIGN KEY ("commentsId", "commentsAuthorId", "commentsPostId") REFERENCES "comment"("id","authorId","postId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
