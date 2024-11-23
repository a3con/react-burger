import { useState, useMemo } from 'react'
import { Modal } from '../modal/modal'
import { OrderItem } from './order-item/order-item'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { requestOrderNumber } from '../../services/burger-constructor/actions'
import { useDrop } from 'react-dnd'
import {
  setBun,
  addIngredient,
  //setIngredients,
  cleanOrder,
} from '../../services/burger-constructor/reducer'
import { IIngredient } from '../../utils/interfaces'
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.scss'
import { OrderDetails } from './order-details/order-details'
import { useNavigate } from 'react-router-dom'

export const BurgerConstructor = () => {
  const { bun, ingredients } = useAppSelector(state => state.order)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getTotalPrice = useMemo(() => {
    const totalPrice =
      ingredients.reduce((total, ingredient) => total + ingredient.price, 0) +
      (bun ? bun.price * 2 : 0)
    return totalPrice
  }, [ingredients, bun])

  const handleModalOpen = () => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(requestOrderNumber())
      setShowOrderModal(true)
    }
  }

  const handleModalClose = () => {
    dispatch(cleanOrder())
    setShowOrderModal(false)
  }

  const handleDrop = (ingredient: IIngredient) => {
    if (ingredient.type === 'bun') {
      dispatch(setBun(ingredient))
    } else {
      dispatch(addIngredient(ingredient))
    }
  }

  const [, drop] = useDrop({
    accept: 'ingredient',
    drop: handleDrop,
  })

  return (
    <section className={style.burgerConstructor} ref={drop}>
      <ul
        className={`${style.components} ${
          (bun === null && ingredients.length < 1) && style.empty
        }`}
      >
        {bun !== null && (
          <OrderItem
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
        <li className={style.stuffing}>
          <ul className={style.list}>
            {ingredients.map((ingredient, index) => (
              <OrderItem
                index={index}
                isLocked={false}
                key={ingredient.uuid}
                uuid={ingredient.uuid}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            ))}
          </ul>
        </li>
        {bun !== null && (
          <OrderItem
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </ul>

      <div className={style.info}>
        <div className={style.info__price}>
          <span className="text text_type_digits-medium">{getTotalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleModalOpen}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>

      {showOrderModal && (
        <Modal onClose={handleModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}
