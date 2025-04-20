import { StateCreator } from 'zustand/vanilla'
import { ThemeMode } from '@/styles/styleVariables'

type ThemeModeState = {
  themeMode: ThemeMode
}

const INIT_STATE_THEMEMODE: ThemeModeState = {
  themeMode: 'dark',
}

type ThemeModeActions = {
  changeThemeModeAction: (themeMode: ThemeMode) => void
}

export type ThemeModeStore = ThemeModeState & ThemeModeActions

export const createThemeModeSlice: StateCreator<ThemeModeStore> = (set) => ({
  ...INIT_STATE_THEMEMODE,
  changeThemeModeAction: (themeMode) => set(() => ({ themeMode })),
})
