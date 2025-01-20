import { initialState, setIsAuthChecked, setUser, userSlice } from './reducer'
import { login, logout, checkUserAuth, patchUser } from './actions'
// import { useNavigate } from 'react-router-dom'
// import * as router from 'react-router'

// const navigate = jest.fn()

describe('userSlice Test', () => {
  // let store;
  // let navigateMock;

  // let fetchSpy: jest.Spied<typeof fetch>

  // beforeEach(() => {
  //   fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
  //     ok: true,
  //     json: function () {
  //       return { result: 'OK' }
  //     },
  //   } as unknown as Response)
  // })

  // let useNavigateSpy: jest.Spied<typeof useNavigate>

  // beforeEach(() => {
  //   useNavigateSpy = jest
  //     .spyOn(router, 'useNavigate')
  //     .mockImplementation(() => navigate)
  // })

  // afterEach(() => {
  //   jest.restoreAllMocks()
  // })

  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle login.fulfilled action', () => {
    const email = 'test@test.com'

    expect(
      userSlice.reducer(undefined, {
        type: login.fulfilled.type,
        payload: { email },
      }),
    ).toEqual({ ...initialState, isAuthChecked: true, user: { email } })
  })

  it('should handle logout.fulfilled action', () => {
    expect(
      userSlice.reducer(undefined, {
        type: logout.fulfilled.type,
      }),
    ).toEqual({ ...initialState, user: null })
  })

  it('should create an action to set user', () => {
    const newUser = { name: 'User', email: 'test@test.com' }
    const action = setUser(newUser)

    const newState = userSlice.reducer(initialState, action)

    expect(newState.user).toEqual(newUser)
  })

  it('should create an action to set auth checked', () => {
    const action = setIsAuthChecked(true)

    const newState = userSlice.reducer(initialState, action)

    expect(newState.isAuthChecked).toBe(true)
  })
})
