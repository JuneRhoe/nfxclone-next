import { relations } from "drizzle-orm/relations";
import { nfxcloneUsersInDevelop, nfxcloneSessionsInDevelop } from "./schema";

export const nfxcloneSessionsInDevelopRelations = relations(nfxcloneSessionsInDevelop, ({one}) => ({
	nfxcloneUsersInDevelop: one(nfxcloneUsersInDevelop, {
		fields: [nfxcloneSessionsInDevelop.userId],
		references: [nfxcloneUsersInDevelop.userId]
	}),
}));

export const nfxcloneUsersInDevelopRelations = relations(nfxcloneUsersInDevelop, ({many}) => ({
	nfxcloneSessionsInDevelops: many(nfxcloneSessionsInDevelop),
}));