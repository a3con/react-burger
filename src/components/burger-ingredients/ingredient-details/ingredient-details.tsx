import { useParams } from 'react-router-dom'
import styles from './ingredient-details.module.scss'
import { useAppSelector } from '../../../services/store'

export const IngredientDetails = () => {
  const { id } = useParams()
  const ingredients = useAppSelector(state => state.ingredients.ingredients)
  const ingredient = ingredients.find(item => item._id === id)

  if (!ingredient) return null

  return (
    <div className={styles.details}>
      <div
        className={styles.details__image}
        style={{ backgroundImage: `url(${ingredient.image_large})` }}
      ></div>

      <span className={styles.details__name}>{ingredient.name}</span>

      <ul className={styles.nutritional}>
        <li className={styles.nutritional__item}>
          <span>Калории, ккал</span>
          <span className={styles.nutritional__value}>
            {ingredient.calories}
          </span>
        </li>
        <li className={styles.nutritional__item}>
          <span>Белки, г</span>
          <span className={styles.nutritional__value}>
            {ingredient.proteins}
          </span>
        </li>
        <li className={styles.nutritional__item}>
          <span>Жиры, г</span>
          <span className={styles.nutritional__value}>{ingredient.fat}</span>
        </li>
        <li className={styles.nutritional__item}>
          <span>Углеводы, г</span>
          <span className={styles.nutritional__value}>
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  )
}
