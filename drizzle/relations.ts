import { relations } from "drizzle-orm/relations";
import { mediasInDevelop, usersMyMediasInDevelop, nfxcloneUsersInDevelop, mediaMainCategoriesInDevelop, browsePreviewMediaListInDevelop, mediaBrowseDisplayInDevelop } from "./schema";

export const usersMyMediasInDevelopRelations = relations(usersMyMediasInDevelop, ({one}) => ({
	mediasInDevelop: one(mediasInDevelop, {
		fields: [usersMyMediasInDevelop.mediaId],
		references: [mediasInDevelop.id]
	}),
	nfxcloneUsersInDevelop: one(nfxcloneUsersInDevelop, {
		fields: [usersMyMediasInDevelop.userUuid],
		references: [nfxcloneUsersInDevelop.id]
	}),
}));

export const mediasInDevelopRelations = relations(mediasInDevelop, ({one, many}) => ({
	usersMyMediasInDevelops: many(usersMyMediasInDevelop),
	mediaMainCategoriesInDevelop: one(mediaMainCategoriesInDevelop, {
		fields: [mediasInDevelop.mainCategory],
		references: [mediaMainCategoriesInDevelop.id]
	}),
	browsePreviewMediaListInDevelops: many(browsePreviewMediaListInDevelop),
}));

export const nfxcloneUsersInDevelopRelations = relations(nfxcloneUsersInDevelop, ({many}) => ({
	usersMyMediasInDevelops: many(usersMyMediasInDevelop),
}));

export const mediaMainCategoriesInDevelopRelations = relations(mediaMainCategoriesInDevelop, ({many}) => ({
	mediasInDevelops: many(mediasInDevelop),
	mediaBrowseDisplayInDevelops: many(mediaBrowseDisplayInDevelop),
}));

export const browsePreviewMediaListInDevelopRelations = relations(browsePreviewMediaListInDevelop, ({one}) => ({
	mediasInDevelop: one(mediasInDevelop, {
		fields: [browsePreviewMediaListInDevelop.mediaId],
		references: [mediasInDevelop.id]
	}),
}));

export const mediaBrowseDisplayInDevelopRelations = relations(mediaBrowseDisplayInDevelop, ({one}) => ({
	mediaMainCategoriesInDevelop: one(mediaMainCategoriesInDevelop, {
		fields: [mediaBrowseDisplayInDevelop.mainCategory],
		references: [mediaMainCategoriesInDevelop.id]
	}),
}));