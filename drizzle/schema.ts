import { pgTable, pgSchema, unique, uuid, date, text, foreignKey, bigint, timestamp, smallint, serial } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const develop = pgSchema("develop");

export const drizzleMgTableIdSeqInDevelop = develop.sequence("drizzle-mg-table_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })

export const nfxcloneSessionsInDevelop = develop.table("nfxclone_sessions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	expiresAt: date("expires_at").notNull(),
	userId: text("user_id").notNull(),
}, (table) => [
	unique("nfxclone_sessions_user_id_key").on(table.userId),
]);

export const usersMyMediasInDevelop = develop.table("users_my_medias", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "develop.users_my_medias_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	userUuid: uuid("user_uuid").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [mediasInDevelop.id],
			name: "users_my_medias_media_id_fkey1"
		}),
	foreignKey({
			columns: [table.userUuid],
			foreignColumns: [nfxcloneUsersInDevelop.id],
			name: "users_my_medias_user_uuid_fkey1"
		}),
]);

export const tmpTableInDevelop = develop.table("tmp_table", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tmpName: text("tmp_name"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const mediaMainCategoriesInDevelop = develop.table("media_main_categories", {
	id: smallint().primaryKey().generatedByDefaultAsIdentity({ name: "develop.media_main_category_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 32767, cache: 1 }),
	label: text().notNull(),
});

export const drizzleMgTableInDevelop = develop.table("drizzle-mg-table", {
	id: serial().primaryKey().notNull(),
	hash: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdAt: bigint("created_at", { mode: "number" }),
});

export const mediaCastsInDevelop = develop.table("media_casts", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "develop.media_casts_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).notNull(),
	cast: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [mediasInDevelop.id],
			name: "media_casts_media_id_fkey"
		}),
]);

export const nfxcloneUsersInDevelop = develop.table("nfxclone_users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	userId: text("user_id").notNull(),
	userPassword: text("user_password").notNull(),
}, (table) => [
	unique("nfxclone_users_user_id_key").on(table.userId),
]);

export const mediasInDevelop = develop.table("medias", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().notNull(),
	mediaId: text(),
	titleImg: text(),
	mainCategory: smallint(),
	subCategory: text(),
	mediaType: text(),
	madeAt: date(),
	title: text(),
	casts: text().array(),
	genres: text().array(),
	impressions: text().array(),
	ratingSymbol: text(),
	ratingDetails: text().array(),
	description: text(),
	previewMainImg: text(),
	previewTitleImg: text(),
	previewTrailer: text(),
}, (table) => [
	foreignKey({
			columns: [table.mainCategory],
			foreignColumns: [mediaMainCategoriesInDevelop.id],
			name: "medias_maincategory_fkey"
		}),
]);

export const mediaGenresInDevelop = develop.table("media_genres", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "develop.media_genres_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).notNull(),
	genre: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [mediasInDevelop.id],
			name: "media_genres_media_id_fkey"
		}),
]);

export const browsePreviewMediaListInDevelop = develop.table("browse_preview_media_list", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "develop.media_preview_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [mediasInDevelop.id],
			name: "media_preview_media_id_fkey"
		}),
]);

export const mediaBrowseDisplayInDevelop = develop.table("media_browse_display", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "develop.media_browse_display_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	mainCategory: smallint("main_category").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.mainCategory],
			foreignColumns: [mediaMainCategoriesInDevelop.id],
			name: "media_browse_display_main_category_fkey"
		}),
]);
