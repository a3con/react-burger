import { useLocation, useNavigate } from 'react-router-dom'
import { IIngredient } from '../../../utils/interfaces'
import { PriceTag } from '../../price-tag/price-tag'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './orders.module.scss'

//const previewLimit: number = 5

interface IOrderPreviewProps {
  ingredients: IIngredient[]
}

export const OrderPreview = ({
  ingredients,
}: IOrderPreviewProps): React.JSX.Element => {
  //const previewIngredients = ingredients.slice(0, previewLimit)
  //const moreCount = Math.max(0, ingredients.length - previewLimit)

  console.log(ingredients)

  return (
    <ul className={styles.preview}>
      <li className={styles.preview__item} style={{ zIndex: 3 }}>
        <img
          src="https://code.s3.yandex.net/react/code/meat-01.png"
          width="112"
          height="56"
          alt=""
        />
      </li>

      <li className={styles.preview__item} style={{ zIndex: 2 }}>
        <img
          src="https://code.s3.yandex.net/react/code/meat-04.png"
          width="112"
          height="56"
          alt=""
        />
      </li>

      <li className={styles.preview__item} style={{ zIndex: 1 }}>
        <img
          src="https://code.s3.yandex.net/react/code/core.png"
          width="112"
          height="56"
          alt=""
        />
        <span className={styles.preview__more}>+{3}</span>
      </li>
    </ul>
  )
}

export const ProfileOrders = (): React.JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()

  const openDetails = () => {
    navigate(`/profile/orders/${1}`, {
      state: { background: location },
    })
  }

  return (
    <div className={styles.history}>
      <article className={styles.card} onClick={openDetails}>
        <header className={styles.card__header}>
          <p className={styles.card__id}>#034534</p>
          <FormattedDate className={styles.card__date} date={new Date()} />
        </header>
        <div className={styles.card__body}>
          <h3 className={styles.card__title}>Interstellar бургер</h3>
          <p className={styles.card__status}>Готовится</p>
        </div>
        <footer className={styles.card__footer}>
          <OrderPreview ingredients={[]} />
          <PriceTag price={150} />
        </footer>
      </article>
    </div>
  )
}
