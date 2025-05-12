'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'
import {
  ThemeModeStore,
  createThemeModeSlice,
} from '@/libs/stores/slices/themeModeSlice'
import { createUserInfoSlice, UserInfoStore } from './slices/userInfoSlice'
import { createMyMediasSlice, MyMediasStore } from './slices/myMediasSlice'

const createMainStore = () =>
  createStore<UserInfoStore & MyMediasStore & ThemeModeStore>()(
    (...inputParams) => ({
      ...createUserInfoSlice(...inputParams),
      ...createMyMediasSlice(...inputParams),
      ...createThemeModeSlice(...inputParams),
    }),
  )

type MainStoreApi = ReturnType<typeof createMainStore>
const MainStoreContext = createContext<MainStoreApi | undefined>(undefined)

export const MainStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<MainStoreApi | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createMainStore()
  }

  return (
    <MainStoreContext.Provider value={storeRef.current}>
      {children}
    </MainStoreContext.Provider>
  )
}

export const useMainStore = <T,>(
  selector: (store: UserInfoStore & MyMediasStore & ThemeModeStore) => T,
): T => {
  const mainStoreContext = useContext(MainStoreContext)

  if (!mainStoreContext) {
    throw new Error(`useMainStore must be used within MainStoreProvider`)
  }

  return useStore(mainStoreContext, selector)
}
