import { createSlice } from '@reduxjs/toolkit'
import { requestOrderNumber } from './actions'
import { IIngredient } from '../../utils/interfaces'
import { v4 as uuidv4 } from 'uuid'

export interface IConstructorIngredient extends IIngredient {
  uuid: string
}

export interface IStateOrder {
  bun: IConstructorIngredient | null
  ingredients: IConstructorIngredient[]
  orderNumber: number | null
  loading: boolean
  error: string | null
}

export const initialState: IStateOrder = {
  bun: null,
  ingredients: [],
  orderNumber: null,
  loading: false,
  error: null,
}

export const burgerConstructorSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload
    },
    addIngredient: (state, action) => {
      const ingredient = action.payload
      state.ingredients.push({ ...ingredient, uuid: uuidv4() })
    },
    removeIngredient: (state, action) => {
      const uuid = action.payload
      state.ingredients = state.ingredients.filter(
        ingredient => ingredient.uuid !== uuid,
      )
    },
    moveIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload
      const dragItem = state.ingredients[dragIndex]
      const newItemsOrder = [...state.ingredients]
      newItemsOrder.splice(dragIndex, 1)
      newItemsOrder.splice(hoverIndex, 0, dragItem)
      state.ingredients = newItemsOrder
    },
    cleanOrder: state => {
      state.orderNumber = initialState.orderNumber
      state.ingredients = initialState.ingredients
      state.bun = initialState.bun
    },
  },
  extraReducers: builder => {
    builder.addCase(requestOrderNumber.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(requestOrderNumber.fulfilled, (state, action) => {
      state.orderNumber = action.payload
      state.loading = false
      state.error = null
    })
    builder.addCase(requestOrderNumber.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || null
    })
  },
})

export const {
  setBun,
  addIngredient,
  setIngredients,
  removeIngredient,
  moveIngredient,
  cleanOrder,
} = burgerConstructorSlice.actions
