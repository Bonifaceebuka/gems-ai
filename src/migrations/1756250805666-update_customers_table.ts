import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCustomersTable1756250805666 implements MigrationInterface {
    name = 'UpdateCustomersTable1756250805666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "guest_id"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "shop_id"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_11f6e55796af22bc5cdce87153a"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "store_issued_uuid"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customer_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customer_phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "created_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_8f138f284609b045dc64c91757a" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_8f138f284609b045dc64c91757a"`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customer_phone"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customer_name"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "store_issued_uuid" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_11f6e55796af22bc5cdce87153a" UNIQUE ("store_issued_uuid")`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "shop_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "guest_id" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "company_name" character varying`);
    }

}
