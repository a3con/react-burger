import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './ingredient-item.module.scss'

interface IIngredientItemProps {
  name: string
  price: number
  count: number
  image: string
  onClick: () => void
}

export const IngredientItem = ({
  image,
  name,
  price,
  onClick,
  count = 0,
}: IIngredientItemProps) => {
  return (
    <div className={style.ingredient} onClick={onClick}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div>
        <img src={image} alt={name} width="240" height="120" />
      </div>
      <div className={style.price}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={style.name}>{name}</span>
    </div>
  )
}
