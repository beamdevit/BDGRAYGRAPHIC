import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_theme" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary" varchar DEFAULT '#016ac6' NOT NULL,
  	"primary_dark" varchar DEFAULT '#004392' NOT NULL,
  	"accent" varchar DEFAULT '#0070c6' NOT NULL,
  	"ink" varchar DEFAULT '#16213e' NOT NULL,
  	"page_bg" varchar DEFAULT '#ffffff' NOT NULL,
  	"paper" varchar DEFAULT '#eef4fb' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_theme" CASCADE;`)
}
