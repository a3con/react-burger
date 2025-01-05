import iconChecked from '../../../images/checked.svg'
import { useSelector } from '../../../services/store'
import styles from './order-details.module.scss'

export const OrderDetails = (): React.JSX.Element => {
  const { error, loading, orderNumber } = useSelector(state => state.order)

  if (loading) {
    return (
      <div className={styles.order}>
        <p className={styles.order__status}>Оформление заказа...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.order}>
        <p className={styles.order__status}>Что-то пошло не так:(</p>
      </div>
    )
  }

  return (
    <div className={styles.order}>
      <p className={styles.order__id}>{orderNumber}</p>
      <p className={styles.order__text}>идентификатор заказа</p>
      <img
        className="mt-15 mb-15"
        src={iconChecked}
        alt="Изображение успешного заказа"
        width="120"
        height="120"
      />
      <p className="mb-2">Ваш заказ начали готовить</p>
      <p className="mb-20" style={{ color: 'var(--text-inactive-color)' }}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
