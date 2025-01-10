import { PriceTag } from '../price-tag/price-tag'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { IOrder } from '../../utils/interfaces'
import { useSelector, useDispatch } from '../../services/store'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { requestOrderByNumber } from '../../services/burger-constructor/actions'
import { OrderStatus } from '../order-status/order-status'
import { OrderPrice } from '../order-price/order-price'
import { Loader } from '../loader/loader'
import styles from './order-details.module.scss'

const mergeIngredients = (ingredients: string[]): Record<string, number> => {
  const sameIngredients: Record<string, number> = {}
  ingredients.forEach((ingredientId: string) => {
    sameIngredients[ingredientId] = (sameIngredients[ingredientId] || 0) + 1
  })
  return sameIngredients
}

export const OrderDetails = (): React.JSX.Element => {
  const { id } = useParams()
  const number = Number(id)
  const dispatch = useDispatch()

  const ingredientsById = useSelector(
    state => state.ingredients.ingredientsById,
  )

  const order: IOrder | null = useSelector(state => {
    let order = state.orders.orders.find(order => order.number === number)

    if (order) return order

    order = state.userOrders.userOrders.find(order => order.number === number)

    if (order) return order

    return state.order.currentOrder
  })

  useEffect(() => {
    if (!order) {
      dispatch(requestOrderByNumber(number))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!order) {
    return <Loader text="Загрузка..." />
  }

  const mergedIngredients = mergeIngredients(order.ingredients)

  return (
    <article className={styles.details}>
      <h3 className={styles.details__id}>#{order.number}</h3>
      <div className={styles.details__head}>
        <h3 className={styles.details__title}>{order.name}</h3>
        <OrderStatus status={order.status} />
      </div>

      <div className={styles.details__body}>
        <h3 className={styles.details__title}>Состав:</h3>
        <ul className={styles.details__list}>
          {Object.keys(mergedIngredients).map((ingredientId, index: number) => {
            const foundIngredient = ingredientsById[ingredientId]
            if (!foundIngredient) return null
            const count = mergedIngredients[ingredientId]
            return (
              <li className={styles.details__item} key={index}>
                <div className={styles.details__item_ingredient}>
                  <div className={styles.details__img}>
                    <img
                      width="112"
                      height="56"
                      src={foundIngredient.image}
                      alt={foundIngredient.name}
                    />
                  </div>
                  <h4 className={styles.details__name}>
                    {foundIngredient.name}
                  </h4>
                </div>
                <div className={styles.details__item_price}>
                  <PriceTag price={foundIngredient.price} count={count} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.details__footer}>
        <FormattedDate
          className={styles.details__date}
          date={new Date(order.createdAt)}
        />
        <OrderPrice ingredients={order.ingredients} />
      </div>
    </article>
  )
}
