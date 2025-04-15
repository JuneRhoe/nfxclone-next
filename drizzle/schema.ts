import { pgTable, pgSchema, foreignKey, unique, uuid, date, text, timestamp, serial, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const develop = pgSchema("develop");

export const drizzleMgTableIdSeqInDevelop = develop.sequence("drizzle-mg-table_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })

export const nfxcloneSessionsInDevelop = develop.table("nfxclone_sessions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	expiresAt: date("expires_at").notNull(),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [nfxcloneUsersInDevelop.userId],
			name: "nfxclone_sessions_user_id_fkey"
		}).onDelete("cascade"),
	unique("nfxclone_sessions_user_id_key").on(table.userId),
]);

export const tmpTableInDevelop = develop.table("tmp_table", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tmpName: text("tmp_name"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const drizzleMgTableInDevelop = develop.table("drizzle-mg-table", {
	id: serial().primaryKey().notNull(),
	hash: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdAt: bigint("created_at", { mode: "number" }),
});

export const nfxcloneUsersInDevelop = develop.table("nfxclone_users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	userId: text("user_id").notNull(),
	userPassword: text("user_password"),
}, (table) => [
	unique("nfxclone_users_user_id_key").on(table.userId),
]);
