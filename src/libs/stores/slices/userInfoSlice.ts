import { StateCreator } from 'zustand/vanilla'
import { UserSelect } from '@/drizzle-definitions/data-types'

type UserInfo = Pick<UserSelect, 'id' | 'userId'>

type UserInfoState = {
  userInfo: UserInfo | null
}

const INIT_STATE_USERINFO: UserInfoState = {
  userInfo: null,
}

type UserInfoActions = {
  setUserInfoAction: (userInfo: UserInfo) => void
  removeUserInfoAction: () => void
}

export type UserInfoStore = UserInfoState & UserInfoActions

export const createUserInfoSlice: StateCreator<UserInfoStore> = (set) => ({
  ...INIT_STATE_USERINFO,
  setUserInfoAction: (userInfo) => set(() => ({ userInfo })),
  removeUserInfoAction: () => set(() => ({ userInfo: null })),
})
