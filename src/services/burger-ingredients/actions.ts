import { request, endpoints } from '../../utils/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IIngredient } from '../../utils/interfaces'
import type { IResponseSuccess } from '../../utils/api'

export interface IIngredientsResponse extends IResponseSuccess {
  data: IIngredient[]
}

export const getIngredients = createAsyncThunk(
  'burgerIngredients/getIngredients',
  async () => {
    const ingredients = await request<IIngredientsResponse>(endpoints.ingredients)
    return ingredients
  },
)
