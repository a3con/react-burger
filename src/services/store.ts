import { burgerIngredientsSlice } from './burger-ingredients/reducer.js'
import { burgerConstructorSlice } from './burger-constructor/reducer.js'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
)

export const store = configureStore({
  reducer: rootReducer,
})

// Type helpers
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
