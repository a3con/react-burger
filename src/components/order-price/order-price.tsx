import { useSelector } from '../../services/store'
import { PriceTag } from '../price-tag/price-tag'

interface IOrderPriceProps {
  ingredients: string[]
}

export const OrderPrice = ({ ingredients }: IOrderPriceProps): React.JSX.Element => {
  const ingredientsById = useSelector(
    state => state.ingredients.ingredientsById,
  )

  const totalPrice = ingredients.reduce((sum, ingredientId) => {
    return sum + (ingredientsById[ingredientId]?.price ?? 0)
  }, 0)

  return <PriceTag price={totalPrice} />
}
