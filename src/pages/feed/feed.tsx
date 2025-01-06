import { useEffect } from 'react'
import { useDispatch, useSelector } from '../../services/store'
import { IOrder } from '../../utils/interfaces'
import { OrderCard } from '../../components/order-card/order-card'
import { OrdersHistoryActions } from '../../services/orders-history/actions'
import { wsEndpoints } from '../../utils/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader } from '../../components/loader/loader'
import styles from './feed.module.scss'

const ORDER_DISPLAY_LIMIT = 14

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const { orders, total, totalToday } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(OrdersHistoryActions.connect(wsEndpoints.feed))
    return () => {
      dispatch(OrdersHistoryActions.disconnect())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const location = useLocation()
  const navigate = useNavigate()

  const openDetails = (number: number) => {
    navigate(`/feed/${number}`, {
      state: { background: location },
    })
  }

  if (orders.length < 1) {
    return <Loader text="Загрузка..." />
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Лента заказов</h1>
      <section className={styles.ordersHistory}>
        <div className={styles.orders}>
          {orders.map((order: IOrder) => (
            <OrderCard
              key={order._id}
              order={order}
              onClick={() => openDetails(order.number)}
              showStatus={false}
            />
          ))}
        </div>
      </section>
      <section className={styles.ordersInfo}>
        <div className={styles.ordersStatuses}>
          <div>
            <h3 className={styles.title}>Готовы:</h3>
            <ul className={`${styles.orderNumbers} ${styles.success}`}>
              {orders
                .filter((order: IOrder) => order.status === 'done')
                .slice(0, ORDER_DISPLAY_LIMIT)
                .map((order: IOrder) => (
                  <li key={order.number}>{order.number}</li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.title}>В работе:</h3>
            <ul className={styles.orderNumbers}>
              {orders
                .filter((order: IOrder) => order.status !== 'done')
                .slice(0, ORDER_DISPLAY_LIMIT)
                .map((order: IOrder) => (
                  <li key={order.number}>{order.number}</li>
                ))}
            </ul>
          </div>
        </div>
        <p>
          <span className={styles.title}>Выполнено за все время:</span>
          <span className={styles.total}>{total}</span>
        </p>
        <p>
          <span className={styles.title}>Выполнено за сегодня:</span>
          <span className={styles.total}>{totalToday}</span>
        </p>
      </section>
    </div>
  )
}
