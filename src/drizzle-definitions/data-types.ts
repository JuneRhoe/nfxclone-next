import {
  nfxCloneUsers,
  medias,
  usersMyMedias,
  mediaMainCategories,
  browsePreviewMediaList,
  mediaBrowseDisplay,
} from './table-aliases'

export type UserSelect = typeof nfxCloneUsers.$inferSelect
export type MediaSelect = typeof medias.$inferSelect
export type UsersMyMedias = typeof usersMyMedias.$inferSelect
export type MediaMainCategoriesSelect = typeof mediaMainCategories.$inferSelect
export type BrowsePreviewMediaListSelect =
  typeof browsePreviewMediaList.$inferSelect
export type MediaBrowseDisplaySelect = typeof mediaBrowseDisplay.$inferSelect
