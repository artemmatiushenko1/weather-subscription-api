import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1747561809018 implements MigrationInterface {
  name = 'Init1747561809018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."subscriptions_frequency_enum" AS ENUM('daily', 'hourly')`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "city" character varying NOT NULL, "frequency" "public"."subscriptions_frequency_enum" NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."subscription_tokens_scope_enum" AS ENUM('confirm', 'unsubscribe')`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiresAt" TIMESTAMP, "scope" "public"."subscription_tokens_scope_enum" NOT NULL, "subscriptionId" integer, CONSTRAINT "UQ_79765c42add12daeaebeae8f1e9" UNIQUE ("token"), CONSTRAINT "PK_2dd83c1e48daf4a9b2e75e625d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_tokens" ADD CONSTRAINT "FK_0a91da182bd443e80928fa31559" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription_tokens" DROP CONSTRAINT "FK_0a91da182bd443e80928fa31559"`,
    );
    await queryRunner.query(`DROP TABLE "subscription_tokens"`);
    await queryRunner.query(
      `DROP TYPE "public"."subscription_tokens_scope_enum"`,
    );
    await queryRunner.query(`DROP TABLE "subscriptions"`);
    await queryRunner.query(
      `DROP TYPE "public"."subscriptions_frequency_enum"`,
    );
  }
}
