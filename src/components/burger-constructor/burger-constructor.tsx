import { useState, useMemo } from 'react'
import { Modal } from '../modal/modal'
import { OrderItem } from './order-item/order-item'
import { useDispatch, useSelector } from '../../services/store'
import { requestOrderNumber } from '../../services/burger-constructor/actions'
import { useDrop } from 'react-dnd'
import {
  setBun,
  cleanOrder,
  addIngredient,
} from '../../services/burger-constructor/reducer'
import { IIngredient } from '../../utils/interfaces'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderDetails } from './order-details/order-details'
import { PriceTag } from '../price-tag/price-tag'
import { useNavigate } from 'react-router-dom'
import style from './burger-constructor.module.scss'

export const BurgerConstructor = (): React.JSX.Element => {
  const { bun, ingredients } = useSelector(state => state.order)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
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
    <section
      className={style.burgerConstructor}
      ref={drop}
      data-testid="cy-constructor-drop-area"
    >
      <ul
        className={`${style.components} ${
          bun === null && ingredients.length < 1 && style.empty
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
        <PriceTag price={getTotalPrice} size="medium" />
        <Button
          onClick={handleModalOpen}
          disabled={!bun && ingredients.length === 0}
          htmlType="button"
          type="primary"
          size="large"
          data-testid="cy-constructor-place-an-order"
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
