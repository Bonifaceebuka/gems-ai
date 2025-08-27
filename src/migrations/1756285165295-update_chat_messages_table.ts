import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateChatMessagesTable1756285165295 implements MigrationInterface {
    name = 'UpdateChatMessagesTable1756285165295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "shop_id"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "chat_session_id"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "message_type"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_message_type_enum"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "intervention"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_intervention_enum"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "parent_intervention"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_parent_intervention_enum"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "sent_at"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "read_at"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "delivered_at"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "message_body" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP COLUMN "message_body"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "delivered_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "read_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "sent_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "content" text NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_parent_intervention_enum" AS ENUM('ABANDONED_CART', 'WINDOW_SHOPPER', 'JUST_BROWSING', 'LIKE_AN_ITEM_NO_MONEY', 'TOO_EXPENSIVE', 'COULD_NOT_FIND_ITEM', 'BUY_NOW_PAY_LATER', 'PAY_IN_BITS', 'NOTIFY_ME_MONTH_END')`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "parent_intervention" "public"."chat_messages_parent_intervention_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_intervention_enum" AS ENUM('ABANDONED_CART', 'WINDOW_SHOPPER', 'JUST_BROWSING', 'LIKE_AN_ITEM_NO_MONEY', 'TOO_EXPENSIVE', 'COULD_NOT_FIND_ITEM', 'BUY_NOW_PAY_LATER', 'PAY_IN_BITS', 'NOTIFY_ME_MONTH_END')`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "intervention" "public"."chat_messages_intervention_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_message_type_enum" AS ENUM('TEXT_ONLY', 'IMAGE_ONLY', 'PRODUCT', 'BOTTON', 'QUICK_REPLY', 'RANDOM')`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "message_type" "public"."chat_messages_message_type_enum" NOT NULL DEFAULT 'RANDOM'`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "chat_session_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD "shop_id" integer NOT NULL`);
    }

}
