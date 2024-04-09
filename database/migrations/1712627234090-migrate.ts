import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712627234090 implements MigrationInterface {
    name = 'Migrate1712627234090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_sent_friend_requests_friend_request" ("userId" integer NOT NULL, "friendRequestSenderId" integer NOT NULL, "friendRequestReceiverId" integer NOT NULL, CONSTRAINT "PK_e32c4d61dfd60710aed366d54b2" PRIMARY KEY ("userId", "friendRequestSenderId", "friendRequestReceiverId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf813669edf442a814e2eb4856" ON "user_sent_friend_requests_friend_request" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_886ba2824e035a65108d2ccb03" ON "user_sent_friend_requests_friend_request" ("friendRequestSenderId", "friendRequestReceiverId") `);
        await queryRunner.query(`CREATE TABLE "user_received_friend_requests_friend_request" ("userId" integer NOT NULL, "friendRequestSenderId" integer NOT NULL, "friendRequestReceiverId" integer NOT NULL, CONSTRAINT "PK_355484254784f0ffa051a251e04" PRIMARY KEY ("userId", "friendRequestSenderId", "friendRequestReceiverId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fee0d03a8c9e6a9cd238a190ba" ON "user_received_friend_requests_friend_request" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4d82f406e3bbb74c7c0c5e74a7" ON "user_received_friend_requests_friend_request" ("friendRequestSenderId", "friendRequestReceiverId") `);
        await queryRunner.query(`ALTER TABLE "user_sent_friend_requests_friend_request" ADD CONSTRAINT "FK_cf813669edf442a814e2eb48565" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_sent_friend_requests_friend_request" ADD CONSTRAINT "FK_886ba2824e035a65108d2ccb03b" FOREIGN KEY ("friendRequestSenderId", "friendRequestReceiverId") REFERENCES "friend_request"("senderId","receiverId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_received_friend_requests_friend_request" ADD CONSTRAINT "FK_fee0d03a8c9e6a9cd238a190ba3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_received_friend_requests_friend_request" ADD CONSTRAINT "FK_4d82f406e3bbb74c7c0c5e74a71" FOREIGN KEY ("friendRequestSenderId", "friendRequestReceiverId") REFERENCES "friend_request"("senderId","receiverId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_received_friend_requests_friend_request" DROP CONSTRAINT "FK_4d82f406e3bbb74c7c0c5e74a71"`);
        await queryRunner.query(`ALTER TABLE "user_received_friend_requests_friend_request" DROP CONSTRAINT "FK_fee0d03a8c9e6a9cd238a190ba3"`);
        await queryRunner.query(`ALTER TABLE "user_sent_friend_requests_friend_request" DROP CONSTRAINT "FK_886ba2824e035a65108d2ccb03b"`);
        await queryRunner.query(`ALTER TABLE "user_sent_friend_requests_friend_request" DROP CONSTRAINT "FK_cf813669edf442a814e2eb48565"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4d82f406e3bbb74c7c0c5e74a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fee0d03a8c9e6a9cd238a190ba"`);
        await queryRunner.query(`DROP TABLE "user_received_friend_requests_friend_request"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_886ba2824e035a65108d2ccb03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf813669edf442a814e2eb4856"`);
        await queryRunner.query(`DROP TABLE "user_sent_friend_requests_friend_request"`);
    }

}
