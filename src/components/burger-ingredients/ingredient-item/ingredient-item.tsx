import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../services/store'
import { IIngredient } from '../../../utils/interfaces'
import { useDrag } from 'react-dnd'

import style from './ingredient-item.module.scss'

interface IIngredientItemProps {
  ingredient: IIngredient
  onClick: () => void
}

export const IngredientItem = ({
  ingredient,
  onClick,
}: IIngredientItemProps) => {
  const { bun, ingredients } = useAppSelector(state => state.order)
  const count = [...ingredients, bun].filter(
    item => item?._id === ingredient._id,
  ).length

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })

  return (
    <li className={style.ingredient} onClick={onClick} ref={dragRef}>
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
    </li>
  )
}
