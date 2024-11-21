import { getIngredients } from './actions'
import { createSlice } from '@reduxjs/toolkit'
import { IIngredient } from '../../utils/interfaces'

export interface IStateIngredients {
  ingredients: IIngredient[] | []
  error: null | string
  loading: boolean
}

export const initialState: IStateIngredients = {
  ingredients: [],
  loading: false,
  error: null,
}

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    loadIngredients: state => state,
  },
  extraReducers: builder => {
    builder
      .addCase(getIngredients.pending, state => {
        state.loading = true
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data
        state.loading = false
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'ERROR: Bad request burger-ingredients'
      })
  },
})

export const { loadIngredients } = burgerIngredientsSlice.selectors
