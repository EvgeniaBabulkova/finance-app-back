import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingEntries1740406979665 implements MigrationInterface {
	name = 'AddingEntries1740406979665';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "entry" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "description" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "entry" ADD CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8"`);
		await queryRunner.query(`DROP TABLE "entry"`);
	}
}
