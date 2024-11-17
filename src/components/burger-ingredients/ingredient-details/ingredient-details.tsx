import { useParams } from 'react-router-dom'
import style from './ingredient-details.module.scss'
import { useAppSelector } from '../../../services/store'

export const IngredientDetails = () => {
  const { id } = useParams()
  const ingredients = useAppSelector(state => state.ingredients.ingredients)
  const ingredient = ingredients.find(item => item._id === id)

  if (!ingredient) return null

  return (
    <div className={style.details}>
      <div
        className={style.details__image}
        style={{ backgroundImage: `url(${ingredient.image_large})` }}
      ></div>

      <span className={style.details__name}>{ingredient.name}</span>

      <ul className={style.nutritional}>
        <li className={style.nutritional__item}>
          <span>Калории, ккал</span>
          <span className={style.nutritional__value}>
            {ingredient.calories}
          </span>
        </li>
        <li className={style.nutritional__item}>
          <span>Белки, г</span>
          <span className={style.nutritional__value}>
            {ingredient.proteins}
          </span>
        </li>
        <li className={style.nutritional__item}>
          <span>Жиры, г</span>
          <span className={style.nutritional__value}>{ingredient.fat}</span>
        </li>
        <li className={style.nutritional__item}>
          <span>Углеводы, г</span>
          <span className={style.nutritional__value}>
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  )
}
