import iconChecked from '../../../images/checked.svg'
import { useAppSelector } from '../../../services/store'
import styles from './order-details.module.scss'

export const OrderDetails = () => {
  const { loading, orderNumber } = useAppSelector(state => state.order)
  // TODO:
  // [ ] error handling
  // [ ] refactoring
  return (
    <div className={styles.order}>
      <p
        className={`${styles.order__id} text text_type_digits-large mt-4 mb-8`}
      >
        {orderNumber}
      </p>
      <p className={`${loading ? styles.fade : ''} text text_type_main-medium`}>
        идентификатор заказа
      </p>
      {loading ? (
        <p className="mt-15 mb-15">
          <span className="text text_type_main-medium">
            Оформление заказа...
          </span>
        </p>
      ) : (
        <img
          className="mt-15 mb-15"
          src={iconChecked}
          alt="Изображение успешного заказа"
          width="120"
          height="120"
        />
      )}
      <p
        className={`${
          loading ? styles.fade : ''
        } text text_type_main-default mb-2`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${
          loading ? styles.fade : ''
        } text text_type_main-default mb-20`}
        style={{ color: `var(--text-inactive-color)` }}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
