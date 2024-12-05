import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../utils/interfaces'
import styles from './price-tag.module.scss'

enum PriceTagSizes {
  default,
  medium,
  large,
}

interface IPriceTagProps {
  price: IIngredient['price']
  count?: number
  size?: keyof typeof PriceTagSizes
}

export const PriceTag = ({
  price,
  count,
  size = 'default',
}: IPriceTagProps): React.JSX.Element => {
  return (
    <div className={`${styles.price} text text_type_digits-${size}`}>
      <span>{count ? `${count} x ${price}` : price}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}
