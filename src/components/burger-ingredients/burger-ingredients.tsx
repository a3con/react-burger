import { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientItem } from './ingredient-item/ingredient-item'
import { IngredientDetails } from './ingredient-details/ingredient-details'
import { Modal } from '../modal/modal'
import style from './burger-ingredients.module.scss'
import { IIngredient } from '../../utils/interfaces'

interface IBurgerIngredientsProps {
  ingredients: IIngredient[]
}

export const BurgerIngredients = ({ ingredients }: IBurgerIngredientsProps) => {
  const [currentTab, setCurrentTab] = useState('buns')
  const [currentIngredient, setCurrentIngredient] =
    useState<IIngredient | null>(null)

  const bunItems = ingredients.filter(item => item.type === 'bun')
  const sauceItems = ingredients.filter(item => item.type === 'sauce')
  const mainItems = ingredients.filter(item => item.type === 'main')

  return (
    <section className={style.ingredients}>
      <header className={style.header}>
        <h1 className={style.title}>Соберите бургер</h1>
        <nav className={style.tabs}>
          <Tab
            value="buns"
            active={currentTab === 'buns'}
            onClick={setCurrentTab}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={currentTab === 'sauces'}
            onClick={setCurrentTab}
          >
            Соусы
          </Tab>
          <Tab
            value="fillings"
            active={currentTab === 'fillings'}
            onClick={setCurrentTab}
          >
            Начинки
          </Tab>
        </nav>
      </header>

      <section className={style.categories}>
        <div className={style.views}>
          <article className={style.category}>
            <h2 className={style.category__title}>Булки</h2>
            <ul className={style.list}>
              {bunItems.map(item => (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  onClick={() => setCurrentIngredient(item)}
                  count={3}
                />
              ))}
            </ul>
          </article>

          <article className={style.category}>
            <h2 className={style.category__title}>Соусы</h2>
            <ul className={style.list}>
              {sauceItems.map(item => (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  onClick={() => setCurrentIngredient(item)}
                  count={0}
                />
              ))}
            </ul>
          </article>

          <article className={style.category}>
            <h2 className={style.category__title}>Начинки</h2>
            <ul className={style.list}>
              {mainItems.map(item => (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  onClick={() => setCurrentIngredient(item)}
                  count={1}
                />
              ))}
            </ul>
          </article>
        </div>
      </section>

      {currentIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => setCurrentIngredient(null)}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  )
}
