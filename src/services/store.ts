import { burgerIngredientsSlice } from './burger-ingredients/reducer'
import { burgerConstructorSlice } from './burger-constructor/reducer'
import { userOrdersSlice, userOrdersMiddleware } from './user-orders/reducer'
import { ordersSlice, ordersHistoryMiddleware } from './orders-history/reducer'
import { userSlice } from './user/reducer'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  userOrdersSlice,
  ordersSlice,
  userSlice,
)

export const middlewares = [ordersHistoryMiddleware, userOrdersMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(...middlewares),
})

// Type helpers
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useDispatch = dispatchHook.withTypes<AppDispatch>()
export const useSelector = selectorHook.withTypes<RootState>()
