import { burgerIngredientsSlice } from './burger-ingredients/reducer.js'
import { burgerConstructorSlice } from './burger-constructor/reducer.js'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
//import { useDispatch, useSelector } from 'react-redux'
//import type { TypedUseSelectorHook } from 'react-redux'
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'

// const rootReducer = combineSlices(
//   burgerIngredientsSlice,
//   burgerConstructorSlice,
// )

const rootReducer = combineReducers({
  [burgerIngredientsSlice.reducerPath]: burgerIngredientsSlice.reducer,
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  //[userSlice.reducerPath]: userSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

// Type helpers
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = dispatchHook.withTypes<AppDispatch>()
export const useAppSelector = selectorHook.withTypes<RootState>()
//export const useAppDispatch: () => AppDispatch = useDispatch
//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
