import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndCustomersTable1756248207050 implements MigrationInterface {
    name = 'CreateUsersAndCustomersTable1756248207050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_user_type_enum" AS ENUM('ADMIN', 'MERCHANT')`);
        await queryRunner.query(`CREATE TYPE "public"."users_user_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING', 'BANNED')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying, "last_name" character varying, "otp" character varying, "verification_token" character varying, "verified_at" TIMESTAMP, "otp_expires_at" TIMESTAMP, "token_expires_at" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "user_type" "public"."users_user_type_enum" NOT NULL DEFAULT 'MERCHANT', "user_status" "public"."users_user_status_enum" NOT NULL DEFAULT 'PENDING', CONSTRAINT "UQ_78fb972135c0107138df5aace6b" UNIQUE ("otp"), CONSTRAINT "UQ_659bd3bd8868bd1decb467d9396" UNIQUE ("verification_token"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "company_name" character varying, "phone" character varying, "email" character varying, "guest_id" character varying, "shop_id" integer NOT NULL, "store_issued_uuid" character varying, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_11f6e55796af22bc5cdce87153a" UNIQUE ("store_issued_uuid"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_message_type_enum" AS ENUM('TEXT_ONLY', 'IMAGE_ONLY', 'PRODUCT', 'BOTTON', 'QUICK_REPLY', 'RANDOM')`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_intervention_enum" AS ENUM('ABANDONED_CART', 'WINDOW_SHOPPER', 'JUST_BROWSING', 'LIKE_AN_ITEM_NO_MONEY', 'TOO_EXPENSIVE', 'COULD_NOT_FIND_ITEM', 'BUY_NOW_PAY_LATER', 'PAY_IN_BITS', 'NOTIFY_ME_MONTH_END')`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_parent_intervention_enum" AS ENUM('ABANDONED_CART', 'WINDOW_SHOPPER', 'JUST_BROWSING', 'LIKE_AN_ITEM_NO_MONEY', 'TOO_EXPENSIVE', 'COULD_NOT_FIND_ITEM', 'BUY_NOW_PAY_LATER', 'PAY_IN_BITS', 'NOTIFY_ME_MONTH_END')`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_sender_type_enum" AS ENUM('BOT', 'USER', 'AI_AGENT')`);
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_receiver_type_enum" AS ENUM('BOT', 'USER', 'AI_AGENT')`);
        await queryRunner.query(`CREATE TABLE "chat_messages" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "shop_id" integer NOT NULL, "sender_id" integer, "receiver_id" integer, "chat_session_id" integer NOT NULL, "message_type" "public"."chat_messages_message_type_enum" NOT NULL DEFAULT 'RANDOM', "intervention" "public"."chat_messages_intervention_enum", "parent_intervention" "public"."chat_messages_parent_intervention_enum", "sender_type" "public"."chat_messages_sender_type_enum" NOT NULL DEFAULT 'USER', "receiver_type" "public"."chat_messages_receiver_type_enum" NOT NULL DEFAULT 'USER', "metadata" jsonb, "content" text NOT NULL, "sent_at" TIMESTAMP NOT NULL, "read_at" TIMESTAMP, "delivered_at" TIMESTAMP, CONSTRAINT "PK_40c55ee0e571e268b0d3cd37d10" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "chat_messages"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_receiver_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_sender_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_parent_intervention_enum"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_intervention_enum"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_message_type_enum"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_user_type_enum"`);
    }

}
