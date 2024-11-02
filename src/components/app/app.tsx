import { useEffect } from 'react'
import { AppHeader } from '../app-header/app-header'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { getIngredients } from '../../services/burger-ingredients/actions'
import { loadIngredients } from '../../services/burger-ingredients/reducer'
import style from './app.module.scss'

export default function App() {
  const { loading, error, ingredients } = useAppSelector(loadIngredients)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <div className={style.header}>
        <AppHeader />
      </div>
      {loading && <main className={style.content}><p className={style.status}>Загрузка...</p></main>}
      {error && <main className={style.content}><p className={style.status}>Что-то пошло не так :(</p></main>}
      {!loading && !error && ingredients.length > 0 && (
        <main className={style.content}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor />
        </main>
      )}
    </>
  )
}
