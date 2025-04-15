import { StateCreator } from 'zustand/vanilla'

type CounterState = {
  count: number
}

const INIT_STATE_COUNTER: CounterState = {
  count: 0,
}

type CounterActions = {
  decrementCount: () => void
  incrementCount: () => void
}

export type CounterStore = CounterState & CounterActions

export const createCounterSlice: StateCreator<CounterStore> = (set) => ({
  ...INIT_STATE_COUNTER,
  decrementCount: () => set((state) => ({ count: state.count - 1 })),
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
})
