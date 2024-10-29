import { useState } from 'react'
import { Modal } from '../modal/modal'
import { IIngredient } from '../../utils/interfaces'
import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.scss'
import { OrderDetails } from './order-details/order-details'

interface IBurgerConstructorProps {
  ingredients: IIngredient[]
}

export const BurgerConstructor = ({ ingredients }: IBurgerConstructorProps) => {
  const [showOrder, setShowOrder] = useState(false)

  let bun = null
  const filling = []

  for (const ingredient of ingredients) {
    if (ingredient.type === 'bun') {
      bun = ingredient
    } else {
      filling.push(ingredient)
    }
  }

  return (
    <section className={style.burgerConstructor}>
      <div className={style.components}>
        {bun !== null && (
          <div className={style.component}>
            <div className={style.drag}></div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <div className={style.stuffing}>
          <ul className={style.list}>
            {filling.map(ingredient => (
              <li key={ingredient._id} className={style.component}>
                <div className={style.drag}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            ))}
          </ul>
        </div>
        {bun !== null && (
          <div className={style.component}>
            <div className={style.drag}></div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={style.info}>
        <div className={style.info__price}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setShowOrder(true)}
        >
          Оформить заказ
        </Button>
      </div>

      {showOrder && (
        <Modal onClose={() => setShowOrder(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}
