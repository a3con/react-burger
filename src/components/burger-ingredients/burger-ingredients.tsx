import { useState, useRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientItem } from './ingredient-item/ingredient-item'
import style from './burger-ingredients.module.scss'
import { IIngredient } from '../../utils/interfaces'
import { RefObject } from 'react'
import { useAppSelector } from '../../services/store'
import { loadIngredients } from '../../services/burger-ingredients/reducer'
import { useLocation, useNavigate } from 'react-router-dom'

export const BurgerIngredients = () => {
  const { ingredients } = useAppSelector(loadIngredients)
  const [currentTab, setCurrentTab] = useState('buns')

  const bunsRef = useRef<HTMLDivElement>(null)
  const saucesRef = useRef<HTMLDivElement>(null)
  const fillingsRef = useRef<HTMLDivElement>(null)
  const viewsRef = useRef<HTMLDivElement>(null)

  const bunItems = ingredients.filter(item => item.type === 'bun')
  const sauceItems = ingredients.filter(item => item.type === 'sauce')
  const mainItems = ingredients.filter(item => item.type === 'main')

  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (ingredient: IIngredient) => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    })
  }

  // Как правильно HTMLDivElement или HTMLElement? Ведь можно применить ref не только к <div>?
  const scrollToCategory = (ref: RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const handleScroll = () => {
    if (
      bunsRef.current &&
      saucesRef.current &&
      fillingsRef.current &&
      viewsRef.current
    ) {
      const viewBox = viewsRef.current.getBoundingClientRect()
      const tabsBox: [string, DOMRect][] = [
        ['buns', bunsRef.current.getBoundingClientRect()],
        ['sauces', saucesRef.current.getBoundingClientRect()],
        ['fillings', fillingsRef.current.getBoundingClientRect()],
      ]

      // Если неизвестен порядок в tabsBox
      // tabsBox.sort((a, b) => (a[1].y > b[1].y ? 1 : a[1].y < b[1].y ? -1 : 0))

      let minBox = tabsBox.pop()
      if (!minBox) return

      for (const box of tabsBox) {
        const currBox = Math.round(box[1].y + box[1].height - viewBox.y)
        const prevBox = Math.round(minBox[1].y + minBox[1].height - viewBox.y)
        if (currBox > 0 && prevBox > currBox) {
          minBox = box
        }
      }
      minBox && setCurrentTab(minBox[0])
    }
  }

  return (
    <section className={style.ingredients}>
      <header className={style.header}>
        <h1 className={style.title}>Соберите бургер</h1>
        <nav className={style.tabs}>
          <Tab
            value="buns"
            active={currentTab === 'buns'}
            onClick={() => {
              setCurrentTab('buns')
              scrollToCategory(bunsRef)
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={currentTab === 'sauces'}
            onClick={() => {
              setCurrentTab('sauces')
              scrollToCategory(saucesRef)
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="fillings"
            active={currentTab === 'fillings'}
            onClick={() => {
              setCurrentTab('fillings')
              scrollToCategory(fillingsRef)
            }}
          >
            Начинки
          </Tab>
        </nav>
      </header>

      <section className={style.categories}>
        <div className={style.views} ref={viewsRef} onScroll={handleScroll}>
          <article className={style.category} ref={bunsRef}>
            <h2 className={style.category__title}>Булки</h2>
            <ul className={style.list}>
              {bunItems.map(item => (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  onClick={() => handleClick(item)}
                />
              ))}
            </ul>
          </article>

          <article className={style.category} ref={saucesRef}>
            <h2 className={style.category__title}>Соусы</h2>
            <ul className={style.list}>
              {sauceItems.map(item => (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  onClick={() => handleClick(item)}
                />
              ))}
            </ul>
          </article>

          <article className={style.category} ref={fillingsRef}>
            <h2 className={style.category__title}>Начинки</h2>
            <ul className={style.list}>
              {mainItems.map(item => (
                <IngredientItem
                  key={item._id}
                  ingredient={item}
                  onClick={() => handleClick(item)}
                />
              ))}
            </ul>
          </article>
        </div>
      </section>
    </section>
  )
}
