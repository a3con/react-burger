import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from '../../../services/store'
import { IIngredient } from '../../../utils/interfaces'
import { useDrag } from 'react-dnd'

import styles from './ingredient-item.module.scss'

interface IIngredientItemProps {
  ingredient: IIngredient
  onClick: () => void
}

export const IngredientItem = ({
  ingredient,
  onClick,
}: IIngredientItemProps) => {
  const { bun, ingredients } = useSelector(state => state.order)
  const count = [...ingredients, bun].filter(
    item => item?._id === ingredient._id,
  ).length

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })

  return (
    <li className={styles.ingredient} onClick={onClick} ref={dragRef}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div>
        <img
          src={ingredient.image}
          alt={ingredient.name}
          width="240"
          height="120"
        />
      </div>
      <div className={styles.price}>
        <span className="text text_type_digits-default">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={styles.name}>{ingredient.name}</span>
    </li>
  )
}
