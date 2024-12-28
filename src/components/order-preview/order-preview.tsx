import { useSelector } from '../../services/store'
import styles from './order-preview.module.scss'

const previewLimit: number = 6

interface IOrderPreviewProps {
  ingredients: string[]
}

export const OrderPreview = ({
  ingredients,
}: IOrderPreviewProps): React.JSX.Element => {
  const ingredientsById = useSelector(
    state => state.ingredients.ingredientsById,
  )
  const previewIngredients = ingredients.slice(0, previewLimit)
  const moreCount = Math.max(0, ingredients.length - previewLimit)

  return (
    <ul className={styles.preview}>
      {previewIngredients.map((ingredientId, index) => {
        const ingredient = ingredientsById[ingredientId]
        if (!ingredient) return null
        const zIndex = previewIngredients.length - index
        return (
          <li key={index} className={styles.preview__item} style={{ zIndex }}>
            <img
              src={ingredient.image}
              alt={ingredient.name}
              width="112"
              height="56"
            />
            {moreCount > 0 && zIndex === 1 && (
              <span className={styles.preview__more}>+{moreCount}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
