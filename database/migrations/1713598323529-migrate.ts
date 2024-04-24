import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1713598323529 implements MigrationInterface {
    name = 'Migrate1713598323529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "authorId" integer NOT NULL, "postId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, CONSTRAINT "PK_b7bf60ee2ec2d3627726378714d" PRIMARY KEY ("id", "authorId", "postId"))`);
        await queryRunner.query(`CREATE TABLE "reaction" ("authorId" integer NOT NULL, "postId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, CONSTRAINT "PK_030a92a9e9d3e3ba4c4444b7b42" PRIMARY KEY ("authorId", "postId"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "authorId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "caption" character varying NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ownerId" integer NOT NULL, "memberIds" integer array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("senderId" integer NOT NULL, "receiverId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_3480812cafecf9155f4658b35ec" PRIMARY KEY ("senderId", "receiverId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firebaseUID" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL DEFAULT 'System', "avatar" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "otp" character varying NOT NULL, "validUntil" TIMESTAMP NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_visible_to_user" ("postId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_40056d8dab3f9ec5b75f6248d22" PRIMARY KEY ("postId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df2717c454d909132a655071bc" ON "post_visible_to_user" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_731ca78cde029d5fd73f5f4fe6" ON "post_visible_to_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "group_members_user" ("groupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_7170c9a27e7b823d391d9e11f2e" PRIMARY KEY ("groupId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bfa303089d367a2e3c02b002b8" ON "group_members_user" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_427107c650638bcb2f1e167d2e" ON "group_members_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_f2b5631d91f6b7fda632135932f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04840fd160b733de706a336013" ON "user_friends_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e81f236c989f3fd54836b50a12" ON "user_friends_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_3689cedb63e6688d1c87466a7cd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_dc3aeb83dc815f9f22ebfa7785f" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_af997e6623c9a0e27c241126988" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_9509b72f50f495668bae3c0171c" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_visible_to_user" ADD CONSTRAINT "FK_df2717c454d909132a655071bcc" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_visible_to_user" ADD CONSTRAINT "FK_731ca78cde029d5fd73f5f4fe6f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_members_user" ADD CONSTRAINT "FK_bfa303089d367a2e3c02b002b8f" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_members_user" ADD CONSTRAINT "FK_427107c650638bcb2f1e167d2e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_04840fd160b733de706a3360134" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_e81f236c989f3fd54836b50a12d" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_e81f236c989f3fd54836b50a12d"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_04840fd160b733de706a3360134"`);
        await queryRunner.query(`ALTER TABLE "group_members_user" DROP CONSTRAINT "FK_427107c650638bcb2f1e167d2e5"`);
        await queryRunner.query(`ALTER TABLE "group_members_user" DROP CONSTRAINT "FK_bfa303089d367a2e3c02b002b8f"`);
        await queryRunner.query(`ALTER TABLE "post_visible_to_user" DROP CONSTRAINT "FK_731ca78cde029d5fd73f5f4fe6f"`);
        await queryRunner.query(`ALTER TABLE "post_visible_to_user" DROP CONSTRAINT "FK_df2717c454d909132a655071bcc"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_9509b72f50f495668bae3c0171c"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_af997e6623c9a0e27c241126988"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_dc3aeb83dc815f9f22ebfa7785f"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_3689cedb63e6688d1c87466a7cd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e81f236c989f3fd54836b50a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04840fd160b733de706a336013"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_427107c650638bcb2f1e167d2e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bfa303089d367a2e3c02b002b8"`);
        await queryRunner.query(`DROP TABLE "group_members_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_731ca78cde029d5fd73f5f4fe6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df2717c454d909132a655071bc"`);
        await queryRunner.query(`DROP TABLE "post_visible_to_user"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
