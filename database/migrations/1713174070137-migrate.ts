import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1713174070137 implements MigrationInterface {
    name = 'Migrate1713174070137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_visible_to_user" ("postId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_40056d8dab3f9ec5b75f6248d22" PRIMARY KEY ("postId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df2717c454d909132a655071bc" ON "post_visible_to_user" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_731ca78cde029d5fd73f5f4fe6" ON "post_visible_to_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "visibleToIds"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firebaseUID" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_visible_to_user" ADD CONSTRAINT "FK_df2717c454d909132a655071bcc" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_visible_to_user" ADD CONSTRAINT "FK_731ca78cde029d5fd73f5f4fe6f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_visible_to_user" DROP CONSTRAINT "FK_731ca78cde029d5fd73f5f4fe6f"`);
        await queryRunner.query(`ALTER TABLE "post_visible_to_user" DROP CONSTRAINT "FK_df2717c454d909132a655071bcc"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firebaseUID" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "visibleToIds" integer array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_731ca78cde029d5fd73f5f4fe6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df2717c454d909132a655071bc"`);
        await queryRunner.query(`DROP TABLE "post_visible_to_user"`);
    }

}
