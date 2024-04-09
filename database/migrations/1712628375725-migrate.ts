import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1712628375725 implements MigrationInterface {
    name = 'Migrate1712628375725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "sentFriendRequestsSenderId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "sentFriendRequestsReceiverId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "receivedFriendRequestsSenderId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "receivedFriendRequestsReceiverId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_39da3736a585dd7972a0f0c2c7b" FOREIGN KEY ("sentFriendRequestsSenderId", "sentFriendRequestsReceiverId") REFERENCES "friend_request"("senderId","receiverId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6cfcc8bca53603d326dc3ce9a87" FOREIGN KEY ("receivedFriendRequestsSenderId", "receivedFriendRequestsReceiverId") REFERENCES "friend_request"("senderId","receiverId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6cfcc8bca53603d326dc3ce9a87"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_39da3736a585dd7972a0f0c2c7b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "receivedFriendRequestsReceiverId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "receivedFriendRequestsSenderId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sentFriendRequestsReceiverId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sentFriendRequestsSenderId"`);
    }

}
