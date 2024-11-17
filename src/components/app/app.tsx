import { useEffect } from 'react'
import { useAppDispatch } from '../../services/store'
import { getIngredients } from '../../services/burger-ingredients/actions'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from '../app-layout/app-layout'
import { HomePage } from '../../pages/home/home'

export default function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <Routes location={location}>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  )
}
