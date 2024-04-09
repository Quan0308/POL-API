import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712628598790 implements MigrationInterface {
    name = 'Migrate1712628598790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_39da3736a585dd7972a0f0c2c7b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6cfcc8bca53603d326dc3ce9a87"`);
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_f2b5631d91f6b7fda632135932f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04840fd160b733de706a336013" ON "user_friends_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e81f236c989f3fd54836b50a12" ON "user_friends_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sentFriendRequestsSenderId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sentFriendRequestsReceiverId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "receivedFriendRequestsSenderId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "receivedFriendRequestsReceiverId"`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_9509b72f50f495668bae3c0171c" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_04840fd160b733de706a3360134" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_e81f236c989f3fd54836b50a12d" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_e81f236c989f3fd54836b50a12d"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_04840fd160b733de706a3360134"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_9509b72f50f495668bae3c0171c"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "receivedFriendRequestsReceiverId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "receivedFriendRequestsSenderId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "sentFriendRequestsReceiverId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "sentFriendRequestsSenderId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e81f236c989f3fd54836b50a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04840fd160b733de706a336013"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6cfcc8bca53603d326dc3ce9a87" FOREIGN KEY ("receivedFriendRequestsSenderId", "receivedFriendRequestsReceiverId") REFERENCES "friend_request"("senderId","receiverId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_39da3736a585dd7972a0f0c2c7b" FOREIGN KEY ("sentFriendRequestsSenderId", "sentFriendRequestsReceiverId") REFERENCES "friend_request"("senderId","receiverId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
