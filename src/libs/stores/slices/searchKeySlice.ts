import { StateCreator } from 'zustand/vanilla'

type SearchKeyState = {
  searchKey: string | null
}

const INIT_STATE_SEARCHKEY: SearchKeyState = {
  searchKey: null,
}

type SearchKeyActions = {
  setSearchKeyAction: (searchKey: string) => void
  removeSearchKeyAction: () => void
}

export type SearchKeyStore = SearchKeyState & SearchKeyActions

export const createSearchKeySlice: StateCreator<SearchKeyStore> = (set) => ({
  ...INIT_STATE_SEARCHKEY,
  setSearchKeyAction: (searchKey) => set(() => ({ searchKey })),
  removeSearchKeyAction: () => set(() => ({ searchKey: null })),
})
