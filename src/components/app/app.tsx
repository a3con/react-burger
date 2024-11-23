import { useEffect } from 'react'
import { useAppDispatch } from '../../services/store'
import { getIngredients } from '../../services/burger-ingredients/actions'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AppLayout } from '../app-layout/app-layout'
import { HomePage } from '../../pages/home/home'
import { Modal } from '../modal/modal'
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details'
import { LoginPage } from '../../pages/login/login'
import { RegisterPage } from '../../pages/register/register'
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password'
import { ResetPasswordPage } from '../../pages/reset-password/reset-password'
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route'
import { checkUserAuth } from '../../services/user/actions'
import { ProfilePage } from '../../pages/profile/profile'
import { Profile } from '../profile/profile'
import { ProfileOrders } from '../profile/orders/orders'
import { ProfileOrderDetails } from '../profile/order-details/order-details'

export default function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const background = location.state && location.state.background
  const navigate = useNavigate()
  const closeModal = () => navigate(-1)

  useEffect(() => {
    dispatch(checkUserAuth()) // check: 9
    dispatch(getIngredients())
  }, [])

  // check: 8

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route index element={<Profile />} />
            <Route path="orders" element={<ProfileOrders />} />
            <Route path="orders/:id" element={<ProfileOrderDetails />} />
          </Route>
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title={'Детали ингредиента'} onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}
