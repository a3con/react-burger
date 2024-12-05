import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {
  moveIngredient,
  removeIngredient,
} from '../../../services/burger-constructor/reducer'
import { useDrop, useDrag } from 'react-dnd'
import { useDispatch } from '../../../services/store'
import styles from './order-item.module.scss'

interface IOrderItemProps {
  type?: 'top' | 'bottom'
  isLocked: boolean
  thumbnail: string
  index?: number
  price: number
  uuid?: string
  text: string
}

export const OrderItem = ({
  type,
  uuid,
  text,
  price,
  index,
  isLocked,
  thumbnail,
}: IOrderItemProps) => {
  const dispatch = useDispatch()

  const handleRemove = () => {
    !isLocked && uuid && dispatch(removeIngredient(uuid))
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'moveItem',
    item: { index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  })

  const [, drop] = useDrop({
    accept: 'moveItem',
    hover: (item: { index: number }) => {
      const dragIndex = item.index
      const hoverIndex = index
      if (hoverIndex === undefined || dragIndex === hoverIndex) {
        return
      }
      dispatch(moveIngredient({ dragIndex, hoverIndex }))
      item.index = hoverIndex
    },
  })

  return (
    <li
      className={`${styles.ingredient} ${!isLocked && styles.dragCursor}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      ref={node => (isLocked ? null : drag(drop(node)))}
    >
      <div className={styles.drag}>
        {!isLocked && <DragIcon type="primary" />}
      </div>
      <ConstructorElement
        type={type}
        text={text}
        price={price}
        isLocked={isLocked}
        thumbnail={thumbnail}
        handleClose={handleRemove}
      />
    </li>
  )
}
