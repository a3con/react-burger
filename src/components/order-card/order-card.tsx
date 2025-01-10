import { IOrder } from '../../utils/interfaces'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderStatus } from '../order-status/order-status'
import { OrderPreview } from '../order-preview/order-preview'
import { OrderPrice } from '../order-price/order-price'
import styles from './order-card.module.scss'

interface IOrderCardProps {
  order: IOrder
  showStatus?: boolean
  onClick?: () => void
}

export const OrderCard = ({
  order,
  showStatus = true,
  onClick = () => {},
}: IOrderCardProps): React.JSX.Element => {
  return (
    <article className={styles.card} onClick={onClick}>
      <header className={styles.card__header}>
        <p className={styles.card__id}>#{order.number}</p>
        <FormattedDate
          className={styles.card__date}
          date={new Date(`${order.createdAt}`)}
        />
      </header>
      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{order.name}</h3>
        {showStatus && <OrderStatus status={order.status} />}
      </div>
      <footer className={styles.card__footer}>
        <OrderPreview ingredients={order.ingredients} />
        <OrderPrice ingredients={order.ingredients} />
      </footer>
    </article>
  )
}
