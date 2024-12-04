import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../utils/interfaces'
import styles from './price-tag.module.scss'

export const PriceTag = ({
  price,
  count,
}: {
  price: IIngredient['price']
  count?: number
}) => {
  return (
    <div className={styles.price}>
      <span>{count ? `${count} x ${price}` : price}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}
