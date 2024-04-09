import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712625760397 implements MigrationInterface {
    name = 'Migrate1712625760397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friend_request_sender_user" ("friendRequestSenderId" integer NOT NULL, "friendRequestReceiverId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_09f263fa232ed9d3c5c32f4a76d" PRIMARY KEY ("friendRequestSenderId", "friendRequestReceiverId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_de63b60403e03d8ccdbc5978de" ON "friend_request_sender_user" ("friendRequestSenderId", "friendRequestReceiverId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8b60cb2b595d780ffc5d795c0" ON "friend_request_sender_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "friend_request_receiver_user" ("friendRequestSenderId" integer NOT NULL, "friendRequestReceiverId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_973932603fb894e25cac15ae2f7" PRIMARY KEY ("friendRequestSenderId", "friendRequestReceiverId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4dcbe7996fef50e8eac83f1c11" ON "friend_request_receiver_user" ("friendRequestSenderId", "friendRequestReceiverId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e97c0841b04bc17211aaaa5ddf" ON "friend_request_receiver_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "friend_request_sender_user" ADD CONSTRAINT "FK_de63b60403e03d8ccdbc5978de4" FOREIGN KEY ("friendRequestSenderId", "friendRequestReceiverId") REFERENCES "friend_request"("senderId","receiverId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "friend_request_sender_user" ADD CONSTRAINT "FK_e8b60cb2b595d780ffc5d795c0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request_receiver_user" ADD CONSTRAINT "FK_4dcbe7996fef50e8eac83f1c115" FOREIGN KEY ("friendRequestSenderId", "friendRequestReceiverId") REFERENCES "friend_request"("senderId","receiverId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "friend_request_receiver_user" ADD CONSTRAINT "FK_e97c0841b04bc17211aaaa5ddfc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request_receiver_user" DROP CONSTRAINT "FK_e97c0841b04bc17211aaaa5ddfc"`);
        await queryRunner.query(`ALTER TABLE "friend_request_receiver_user" DROP CONSTRAINT "FK_4dcbe7996fef50e8eac83f1c115"`);
        await queryRunner.query(`ALTER TABLE "friend_request_sender_user" DROP CONSTRAINT "FK_e8b60cb2b595d780ffc5d795c0a"`);
        await queryRunner.query(`ALTER TABLE "friend_request_sender_user" DROP CONSTRAINT "FK_de63b60403e03d8ccdbc5978de4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e97c0841b04bc17211aaaa5ddf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4dcbe7996fef50e8eac83f1c11"`);
        await queryRunner.query(`DROP TABLE "friend_request_receiver_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8b60cb2b595d780ffc5d795c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de63b60403e03d8ccdbc5978de"`);
        await queryRunner.query(`DROP TABLE "friend_request_sender_user"`);
    }

}
