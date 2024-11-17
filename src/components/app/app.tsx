import { useEffect } from 'react'
import { useAppDispatch } from '../../services/store'
import { getIngredients } from '../../services/burger-ingredients/actions'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AppLayout } from '../app-layout/app-layout'
import { HomePage } from '../../pages/home/home'
import { Modal } from '../modal/modal'
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details'

export default function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const background = location.state && location.state.background
  const navigate = useNavigate()
  const closeModal = () => navigate(-1)

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
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
