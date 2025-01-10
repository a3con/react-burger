import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { requestOrderNumber, requestOrderByNumber } from './actions'
import { IIngredient, IOrder } from '../../utils/interfaces'

export interface IConstructorIngredient extends IIngredient {
  uuid: string
}

export interface IStateOrder {
  bun: IConstructorIngredient | null
  ingredients: IConstructorIngredient[]
  orderNumber: number | null
  currentOrder: IOrder | null
  loading: boolean
  error: string | null
}

export const initialState: IStateOrder = {
  bun: null,
  ingredients: [],
  orderNumber: null,
  currentOrder: null,
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
    addIngredient: {
      reducer: (state, action: PayloadAction<IConstructorIngredient>) => {
        const ingredient = action.payload
        state.ingredients.push({ ...ingredient })
      },
      prepare: (ingredient: IIngredient) => {
        return { payload: { ...ingredient, uuid: nanoid() } }
      },
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
      //state.currentOrder = initialState.currentOrder
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
    // Get order by number
    builder.addCase(requestOrderByNumber.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      requestOrderByNumber.fulfilled,
      (state, action: PayloadAction<IOrder>) => {
        const order = action.payload
        if (
          Array.isArray(order.ingredients) &&
          order.ingredients.every(i => typeof i === 'string')
        ) {
          state.currentOrder = order
        }
        state.loading = false
        state.error = null
      },
    )
    builder.addCase(requestOrderByNumber.rejected, (state, action) => {
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
