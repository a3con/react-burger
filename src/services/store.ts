import { burgerIngredientsSlice } from './burger-ingredients/reducer.js'
import { burgerConstructorSlice } from './burger-constructor/reducer.js'
import { userSlice } from './user/reducer.js'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  userSlice,
)

export const store = configureStore({
  reducer: rootReducer,
})

// Type helpers
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useDispatch = dispatchHook.withTypes<AppDispatch>()
export const useSelector = selectorHook.withTypes<RootState>()
