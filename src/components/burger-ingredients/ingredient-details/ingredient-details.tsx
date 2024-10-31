import { IIngredient } from '../../../utils/interfaces'
import style from './ingredient-details.module.scss'

interface IIngredientDetailsProps {
  ingredient: IIngredient
}

export const IngredientDetails = ({ ingredient }: IIngredientDetailsProps) => {
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
