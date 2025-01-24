import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from '../../../services/store'
import { IIngredient } from '../../../utils/interfaces'
import { useDrag } from 'react-dnd'
import { PriceTag } from '../../price-tag/price-tag'
import styles from './ingredient-item.module.scss'

interface IIngredientItemProps {
  ingredient: IIngredient
  onClick: () => void
}

export const IngredientItem = ({
  ingredient,
  onClick,
}: IIngredientItemProps): React.JSX.Element => {
  const { bun, ingredients } = useSelector(state => state.order)
  const count = [...ingredients, bun].filter(
    item => item?._id === ingredient._id,
  ).length

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })

  const testid =
    ingredient.type === 'bun' ? 'cy-ingredient-bun' : 'cy-ingredient-card'

  return (
    <li
      className={styles.ingredient}
      onClick={onClick}
      ref={dragRef}
      data-testid={testid}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div>
        <img
          src={ingredient.image}
          alt={ingredient.name}
          width="240"
          height="120"
        />
      </div>
      <PriceTag price={ingredient.price} />
      <span className={styles.name}>{ingredient.name}</span>
    </li>
  )
}
