import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { useSelector } from '../../services/store'
import { loadIngredients } from '../../services/burger-ingredients/reducer'
import { Loader } from '../../components/loader/loader'
import styles from './home.module.scss'

export const HomePage = (): React.JSX.Element => {
  const { loading, error } = useSelector(loadIngredients)

  if (loading) {
    return <Loader text="Загрузка..." />
  }

  if (error) {
    return <p className={styles.status}>Что-то пошло не так :(</p>
  }

  return (
    <>
      <BurgerIngredients />
      <BurgerConstructor />
    </>
  )
}
