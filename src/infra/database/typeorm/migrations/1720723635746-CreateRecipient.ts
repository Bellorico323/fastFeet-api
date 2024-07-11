import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRecipient1720723635746 implements MigrationInterface {
  name = 'CreateRecipient1720723635746'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, CONSTRAINT "PK_9f7a695711b2055e3c8d5cfcfa1" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recipient"`)
  }
}
