import { getIngredients } from './actions'
import { createSlice } from '@reduxjs/toolkit'
import { IIngredient } from '../../utils/interfaces'

export interface IStateIngredientById {
  [key: string]: IIngredient
}

export interface IStateIngredients {
  ingredientsById: IStateIngredientById
  ingredients: IIngredient[] | []
  error: null | string
  loading: boolean
}

export const initialState: IStateIngredients = {
  ingredientsById: {},
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
        state.ingredientsById = state.ingredients.reduce(
          (result: IStateIngredientById, ingredient, index) => {
            result[ingredient._id] = state.ingredients[index]
            return result
          },
          {},
        )
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
