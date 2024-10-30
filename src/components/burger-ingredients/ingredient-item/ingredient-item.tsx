import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../../utils/interfaces'

import style from './ingredient-item.module.scss'

interface IIngredientItemProps {
  ingredient: IIngredient
  count: number
  onClick: () => void
}

export const IngredientItem = ({
  ingredient,
  onClick,
  count = 0,
}: IIngredientItemProps) => {
  return (
    <div className={style.ingredient} onClick={onClick}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div>
        <img
          src={ingredient.image}
          alt={ingredient.name}
          width="240"
          height="120"
        />
      </div>
      <div className={style.price}>
        <span className="text text_type_digits-default">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={style.name}>{ingredient.name}</span>
    </div>
  )
}
