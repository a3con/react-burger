import { useParams } from 'react-router-dom'
import { useSelector } from '../../../services/store'
import styles from './ingredient-details.module.scss'

export const IngredientDetails = (): React.JSX.Element | null => {
  const { id } = useParams()
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const ingredient = ingredients.find(item => item._id === id)

  if (!ingredient) return null

  return (
    <section className={styles.details}>
      <h3 className={styles.details__title}>Детали ингредиента</h3>

      <div className={styles.details__body}>
        <div
          className={styles.details__img}
          style={{ backgroundImage: `url(${ingredient.image_large})` }}
        ></div>
        <span
          className={styles.details__name}
          data-testid="cy-ingredient-details-name"
        >
          {ingredient.name}
        </span>
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
    </section>
  )
}
