import { configureStore } from "@reduxjs/toolkit"
import { getIngredients } from './actions'
import { initialState, burgerIngredientsSlice } from './reducer'
import { generateMockIngredient } from "../__test__/mocks"

import * as api from '../../utils/api'

const ingredientsReducer = burgerIngredientsSlice.reducer;

const mockedFetchResponse = {
  data: [generateMockIngredient()]
}

describe('ingredients reducer', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should handle getIngredients.pending', () => {
    jest.spyOn(api, 'request').mockResolvedValue(mockedFetchResponse)
    store.dispatch(getIngredients())

    const { ingredients, loading, error } = store.getState().ingredients

    expect(ingredients).toEqual([])
    expect(loading).toBe(true)
    expect(error).toBeNull()
  })

  it('should handle getIngredients.fulfilled', async () => {
    jest.spyOn(api, 'request').mockResolvedValue(mockedFetchResponse)
    await store.dispatch(getIngredients())

    const { ingredients, ingredientsById, loading, error } = store.getState().ingredients

    expect(ingredientsById).toHaveProperty(mockedFetchResponse.data[0]._id)
    expect(ingredients).toEqual(mockedFetchResponse.data)
    expect(loading).toBe(false)
    expect(error).toBeNull()
  })

  it('should handle getIngredients.rejected', async () => {
    jest.spyOn(api, 'request').mockRejectedValue(new Error('Mocked error'))

    await store.dispatch(getIngredients())

    const { ingredients, loading, error } = store.getState().ingredients

    expect(ingredients).toEqual([])
    expect(loading).toBe(false)
    expect(error).toEqual('Mocked error')
  })
})
