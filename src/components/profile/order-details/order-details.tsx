import { PriceTag } from '../../price-tag/price-tag'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-details.module.scss'

export const ProfileOrderDetails = (): React.JSX.Element => {
  const order = {
    name: 'Black Hole Singularity острый бургер',
    status: 'Выполнен',
    createdAt: 0,
    totalPrice: 510,
    ingredients: [
      {
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20,
      },
      {
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20,
      },
      {
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20,
      },
      {
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20,
      },
      {
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20,
      },
    ],
  }

  return (
    order && (
      <article className={styles.details}>
        <h3 className={styles.details__id}>#000000</h3>
        <div className={styles.details__head}>
          <h3 className={styles.details__title}>{order.name}</h3>
          <span className={styles.details__status}>{order.status}</span>
        </div>

        <div className={styles.details__body}>
          <h3 className={styles.details__title}>Состав:</h3>
          <ul className={styles.details__list}>
            {order.ingredients.map((item, index: number) => (
              <li className={styles.details__item} key={index}>
                <div className={styles.details__item_ingredient}>
                  <div className={styles.details__img}>
                    <img
                      width="112"
                      height="56"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <h4 className={styles.details__name}>{item.name}</h4>
                </div>
                <div className={styles.details__item_price}>
                  <PriceTag price={item.price} count={item.count} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.details__footer}>
          <FormattedDate
            className={styles.details__date}
            date={new Date(order.createdAt)}
          />
          <PriceTag price={order.totalPrice} />
        </div>
      </article>
    )
  )
}
