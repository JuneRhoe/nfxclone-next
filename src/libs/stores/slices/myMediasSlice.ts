import { MediaSelect } from '@/drizzle-definitions/data-types'
import { StateCreator } from 'zustand/vanilla'

type MyMediasState = {
  myMedias: MediaSelect[] | null
}

const INIT_STATE_MYMEDIAS: MyMediasState = {
  myMedias: null,
}

type MyMediasActions = {
  setMyMediasAction: (myMedias: MediaSelect[]) => void
  removeMyMediasAction: () => void
}

export type MyMediasStore = MyMediasState & MyMediasActions

export const createMyMediasSlice: StateCreator<MyMediasStore> = (set) => ({
  ...INIT_STATE_MYMEDIAS,
  setMyMediasAction: (myMedias) => set(() => ({ myMedias })),
  removeMyMediasAction: () => set(() => ({ myMedias: null })),
})
