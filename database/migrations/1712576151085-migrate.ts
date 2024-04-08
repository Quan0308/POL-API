import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712576151085 implements MigrationInterface {
    name = 'Migrate1712576151085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friend_request" ("sender" integer NOT NULL, "receiver" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_4c9bb67a66c3495b42eacd63a84" PRIMARY KEY ("sender", "receiver"))`);
        await queryRunner.query(`CREATE TABLE "friend_request_sender_user" ("friendRequestSender" integer NOT NULL, "friendRequestReceiver" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_d420893c17922694160026b312d" PRIMARY KEY ("friendRequestSender", "friendRequestReceiver", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ae8435921696f1c483c26fc1a" ON "friend_request_sender_user" ("friendRequestSender", "friendRequestReceiver") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8b60cb2b595d780ffc5d795c0" ON "friend_request_sender_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "friend_request_receiver_user" ("friendRequestSender" integer NOT NULL, "friendRequestReceiver" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f6076bfbfed48bd95358768ce5d" PRIMARY KEY ("friendRequestSender", "friendRequestReceiver", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7c6496a01b3a58fc3ec0ba98b" ON "friend_request_receiver_user" ("friendRequestSender", "friendRequestReceiver") `);
        await queryRunner.query(`CREATE INDEX "IDX_e97c0841b04bc17211aaaa5ddf" ON "friend_request_receiver_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_f2b5631d91f6b7fda632135932f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04840fd160b733de706a336013" ON "user_friends_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e81f236c989f3fd54836b50a12" ON "user_friends_user" ("userId_2") `);
        await queryRunner.query(`CREATE TABLE "user_sent_friend_requests_friend_request" ("userId" integer NOT NULL, "friendRequestSender" integer NOT NULL, "friendRequestReceiver" integer NOT NULL, CONSTRAINT "PK_fe438fcc05e80dd6e05d1e522d9" PRIMARY KEY ("userId", "friendRequestSender", "friendRequestReceiver"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf813669edf442a814e2eb4856" ON "user_sent_friend_requests_friend_request" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e1b6e55838b625621c756b0a5" ON "user_sent_friend_requests_friend_request" ("friendRequestSender", "friendRequestReceiver") `);
        await queryRunner.query(`CREATE TABLE "user_received_friend_requests_friend_request" ("userId" integer NOT NULL, "friendRequestSender" integer NOT NULL, "friendRequestReceiver" integer NOT NULL, CONSTRAINT "PK_2aa47fed8950481b105ca0fa15d" PRIMARY KEY ("userId", "friendRequestSender", "friendRequestReceiver"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fee0d03a8c9e6a9cd238a190ba" ON "user_received_friend_requests_friend_request" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5da2d659723332cfbd5908c8af" ON "user_received_friend_requests_friend_request" ("friendRequestSender", "friendRequestReceiver") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "friendIds" integer array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "friend_request_sender_user" ADD CONSTRAINT "FK_9ae8435921696f1c483c26fc1a2" FOREIGN KEY ("friendRequestSender", "friendRequestReceiver") REFERENCES "friend_request"("sender","receiver") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "friend_request_sender_user" ADD CONSTRAINT "FK_e8b60cb2b595d780ffc5d795c0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request_receiver_user" ADD CONSTRAINT "FK_a7c6496a01b3a58fc3ec0ba98b1" FOREIGN KEY ("friendRequestSender", "friendRequestReceiver") REFERENCES "friend_request"("sender","receiver") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "friend_request_receiver_user" ADD CONSTRAINT "FK_e97c0841b04bc17211aaaa5ddfc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_04840fd160b733de706a3360134" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_e81f236c989f3fd54836b50a12d" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_sent_friend_requests_friend_request" ADD CONSTRAINT "FK_cf813669edf442a814e2eb48565" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_sent_friend_requests_friend_request" ADD CONSTRAINT "FK_5e1b6e55838b625621c756b0a55" FOREIGN KEY ("friendRequestSender", "friendRequestReceiver") REFERENCES "friend_request"("sender","receiver") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_received_friend_requests_friend_request" ADD CONSTRAINT "FK_fee0d03a8c9e6a9cd238a190ba3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_received_friend_requests_friend_request" ADD CONSTRAINT "FK_5da2d659723332cfbd5908c8af8" FOREIGN KEY ("friendRequestSender", "friendRequestReceiver") REFERENCES "friend_request"("sender","receiver") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_received_friend_requests_friend_request" DROP CONSTRAINT "FK_5da2d659723332cfbd5908c8af8"`);
        await queryRunner.query(`ALTER TABLE "user_received_friend_requests_friend_request" DROP CONSTRAINT "FK_fee0d03a8c9e6a9cd238a190ba3"`);
        await queryRunner.query(`ALTER TABLE "user_sent_friend_requests_friend_request" DROP CONSTRAINT "FK_5e1b6e55838b625621c756b0a55"`);
        await queryRunner.query(`ALTER TABLE "user_sent_friend_requests_friend_request" DROP CONSTRAINT "FK_cf813669edf442a814e2eb48565"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_e81f236c989f3fd54836b50a12d"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_04840fd160b733de706a3360134"`);
        await queryRunner.query(`ALTER TABLE "friend_request_receiver_user" DROP CONSTRAINT "FK_e97c0841b04bc17211aaaa5ddfc"`);
        await queryRunner.query(`ALTER TABLE "friend_request_receiver_user" DROP CONSTRAINT "FK_a7c6496a01b3a58fc3ec0ba98b1"`);
        await queryRunner.query(`ALTER TABLE "friend_request_sender_user" DROP CONSTRAINT "FK_e8b60cb2b595d780ffc5d795c0a"`);
        await queryRunner.query(`ALTER TABLE "friend_request_sender_user" DROP CONSTRAINT "FK_9ae8435921696f1c483c26fc1a2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "friendIds"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5da2d659723332cfbd5908c8af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fee0d03a8c9e6a9cd238a190ba"`);
        await queryRunner.query(`DROP TABLE "user_received_friend_requests_friend_request"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e1b6e55838b625621c756b0a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf813669edf442a814e2eb4856"`);
        await queryRunner.query(`DROP TABLE "user_sent_friend_requests_friend_request"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e81f236c989f3fd54836b50a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04840fd160b733de706a336013"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e97c0841b04bc17211aaaa5ddf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7c6496a01b3a58fc3ec0ba98b"`);
        await queryRunner.query(`DROP TABLE "friend_request_receiver_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8b60cb2b595d780ffc5d795c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ae8435921696f1c483c26fc1a"`);
        await queryRunner.query(`DROP TABLE "friend_request_sender_user"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
    }

}
