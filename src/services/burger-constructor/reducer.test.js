import { configureStore } from "@reduxjs/toolkit"
import { requestOrderNumber, requestOrderByNumber } from './actions'
import {
  burgerConstructorSlice,
  initialState,
  setBun,
  addIngredient,
  setIngredients,
  removeIngredient,
  moveIngredient,
  cleanOrder,
} from './reducer'
import { generateMockBun, generateMockIngredient, generateMockIngredients } from "../__test__/mocks"
import * as api from '../../utils/api'

describe('burgerConstructorSlice reducers', () => {

  /*
  setBun, // OK
  addIngredient, // OK
  setIngredients, // OK
  removeIngredient, // OK
  moveIngredient,
  cleanOrder, // OK
  */

  it('should handle setBun', () => {
    const mockBun = generateMockBun();
    const action = burgerConstructorSlice.actions.setBun(mockBun)

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.bun).toEqual(mockBun)
  })

  it('should handle setIngredients', () => {
    const newIngredients = generateMockIngredients(2)
    const action = burgerConstructorSlice.actions.setIngredients(newIngredients)

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.ingredients).toEqual(newIngredients)
  })

  it('should handle addIngredient', () => {
    const mokeIngredient = generateMockIngredient()
    const action = burgerConstructorSlice.actions.addIngredient(mokeIngredient)

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.ingredients).toHaveLength(1)
    expect({ ...newState.ingredients[0], uuid: mokeIngredient.uuid }).toEqual({ ...mokeIngredient })
  })

  it('should handle removeIngredient', () => {
    const mockBun = generateMockBun()
    const initialIngredients = [...generateMockIngredients(4), mockBun]
    const initialStateWithIngredients = { ...initialState, ingredients: initialIngredients }
    const uuidRemovedIngredient = initialIngredients[0].uuid
    const action = burgerConstructorSlice.actions.removeIngredient(uuidRemovedIngredient)

    const newState = burgerConstructorSlice.reducer(initialStateWithIngredients, action)

    expect(newState.ingredients).toHaveLength(initialIngredients.length - 1)
    expect(newState.ingredients.some(ingredient => ingredient.uuid === uuidRemovedIngredient)).toBeFalsy()
  })

  it('should handle moveIngredient', () => {
    const ingredient1 = generateMockIngredient()
    const ingredient2 = generateMockIngredient()
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    }
    const action = {
      type: moveIngredient,
      payload: { dragIndex: 0, hoverIndex: 1 },
    }
    const expectedState = {
      ...initialState,
      ingredients: [ingredient2, ingredient1],
    }

    const newState = burgerConstructorSlice.reducer(initialStateWithIngredients, action)

    expect(newState).toEqual(expectedState);
  })

  it('should handle cleanOrder', () => {
    const initialStateWithOrder = {
      ...initialState,
      ingredients: generateMockIngredients(2),
      bun: generateMockBun(),
      orderNumber: 1234567,
    }
    const action = burgerConstructorSlice.actions.cleanOrder()

    const newState = burgerConstructorSlice.reducer(initialStateWithOrder, action)

    expect(newState.orderNumber).toBeNull()
    expect(newState.ingredients).toHaveLength(0)
    expect(newState.bun).toBeNull()
  })

  /*
  requestOrderNumber.pending // OK
  requestOrderNumber.fulfilled // OK
  requestOrderNumber.rejected // OK
  requestOrderByNumber.pending // OK
  requestOrderByNumber.fulfilled // OK
  requestOrderByNumber.rejected // OK
  */

  it('should handle requestOrderNumber.pending', () => {
    const action = {
      type: requestOrderNumber.pending.type,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.loading).toBe(true)
    expect(newState.error).toBeNull()
  })

  it('should handle requestOrderNumber.fulfilled', () => {
    const orderNumber = '1234567'
    const action = {
      type: requestOrderNumber.fulfilled.type,
      payload: orderNumber
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.orderNumber).toBe(orderNumber)
    expect(newState.loading).toBe(false)
    expect(newState.error).toBeNull()
  })

  it('should handle requestOrderNumber.rejected', () => {
    const message = 'Some Error'
    const action = {
      type: requestOrderNumber.rejected.type,
      error: { message }
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.loading).toBe(false)
    expect(newState.error).toBe(message)
  })

  it('should handle requestOrderByNumber.pending', () => {
    const action = {
      type: requestOrderByNumber.pending.type,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.loading).toBe(true)
    expect(newState.error).toBeNull()
  })

  it('should handle requestOrderByNumber.fulfilled ingredients is not array', () => {
    const order = { ingredients: null }
    const action = {
      type: requestOrderByNumber.fulfilled.type,
      payload: order,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.currentOrder).toBeNull()
    expect(newState.loading).toBe(false)
    expect(newState.error).toBeNull()
  })

  it('should handle requestOrderByNumber.fulfilled ingredients is array but bad', () => {
    const order = { ingredients: ['string', null] }
    const action = {
      type: requestOrderByNumber.fulfilled.type,
      payload: order,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.currentOrder).toBeNull()
    expect(newState.loading).toBe(false)
    expect(newState.error).toBeNull()
  })

  it('should handle requestOrderByNumber.fulfilled', () => {
    const order = { ingredients: ['string', 'string'] }
    const action = {
      type: requestOrderByNumber.fulfilled.type,
      payload: order,
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.currentOrder).toBe(order)
    expect(newState.loading).toBe(false)
    expect(newState.error).toBeNull()
  })

  it('should handle requestOrderByNumber.rejected', () => {
    const message = 'Some Error'
    const action = {
      type: requestOrderByNumber.rejected.type,
      error: { message }
    }

    const newState = burgerConstructorSlice.reducer(undefined, action)

    expect(newState.loading).toBe(false)
    expect(newState.error).toBe(message)
  })

})
