CREATE SCHEMA "develop";
--> statement-breakpoint
CREATE SEQUENCE "develop"."drizzle-mg-table_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE TABLE "develop"."drizzle-mg-table" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash" text NOT NULL,
	"created_at" bigint
);
--> statement-breakpoint
CREATE TABLE "develop"."nfxclone_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expires_at" date NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "nfxclone_sessions_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "develop"."nfxclone_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"user_password" text,
	CONSTRAINT "nfxclone_users_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "develop"."_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "develop"."tmp_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmp_name" text,
	"created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "develop"."nfxclone_sessions" ADD CONSTRAINT "nfxclone_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "develop"."nfxclone_users"("user_id") ON DELETE cascade ON UPDATE no action;