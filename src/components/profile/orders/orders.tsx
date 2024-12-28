import { useEffect } from 'react'
import { RootState, useDispatch, useSelector } from '../../../services/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { OrderCard } from '../../order-card/order-card'
import { UserOrdersActions } from '../../../services/user-orders/actions'
import { wsEndpoints } from '../../../utils/api'
import { IOrder } from '../../../utils/interfaces'
import styles from './orders.module.scss'

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const orders = useSelector((state: RootState) => state.userOrders.userOrders)

  useEffect(() => {
    dispatch(UserOrdersActions.connect(wsEndpoints.userOrders))
    return () => {
      dispatch(UserOrdersActions.disconnect())
    }
  }, [dispatch])

  const location = useLocation()
  const navigate = useNavigate()

  const openDetails = (number: number) => {
    navigate(`/profile/orders/${number}`, {
      state: { background: location },
    })
  }

  return (
    <div className={styles.history}>
      {orders.map((order: IOrder) => (
        <OrderCard
          order={order}
          key={order._id}
          onClick={() => openDetails(order.number)}
        />
      ))}
    </div>
  )
}
