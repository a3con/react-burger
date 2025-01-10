import { useEffect } from 'react'
import { useDispatch } from '../../services/store'
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
import { OrderDetails } from '../order-details/order-details'
import { FeedPage } from '../../pages/feed/feed'

export default function App(): React.JSX.Element {
  const dispatch = useDispatch()
  const location = useLocation()
  const background = location.state && location.state.background
  const navigate = useNavigate()
  const closeModal = () => navigate(-1)

  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(getIngredients())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/feed/:id" element={<OrderDetails />} />
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
          </Route>
          <Route
            path="/profile/orders/:id"
            element={<OnlyAuth component={<OrderDetails />} />}
          />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={closeModal}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={closeModal}>
                <OnlyAuth component={<OrderDetails />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}
