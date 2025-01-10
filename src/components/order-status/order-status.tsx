import { OrderStatuses } from '../../utils/interfaces'
import styles from './order-status.module.scss'

interface IOrderStatusProps {
  status: keyof typeof OrderStatuses
}

export const OrderStatus = ({ status }: IOrderStatusProps): React.JSX.Element => {
  return (
    <span className={`${styles.status} ${styles['status_' + status]}`}>
      {
        {
          done: 'Выполнен',
          pending: 'Готовится',
          created: 'Создан',
        }[status]
      }
    </span>
  )
}
