import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { useAppSelector } from '../../services/store'
import { loadIngredients } from '../../services/burger-ingredients/reducer'
import style from './home.module.scss'

export const HomePage = () => {
  const { loading, error } = useAppSelector(loadIngredients)

  return (
    <>
      {loading ? (
        <p className={style.status}>Загрузка...</p>
      ) : error ? (
        <p className={style.status}>Что-то пошло не так :(</p>
      ) : (
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      )}
    </>
  )
}
