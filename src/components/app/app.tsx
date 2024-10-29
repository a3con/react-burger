import { useState, useEffect } from 'react'
import { AppHeader } from '../app-header/app-header'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { IIngredient } from '../../utils/interfaces'
import style from './app.module.scss'

const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'

export default function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>(
    [],
  )
  const [ingredients, setIngredients] = useState<IIngredient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(API_INGREDIENTS)
      .then(res => res.json())
      .then(({ success, data }) => {
        if (success) {
          setIngredients(data)
          setSelectedIngredients(data) // Temp
        } else {
          console.log('There was an error', data)
          setError(true)
        }
      })
      .catch(error => {
        console.log('There was an error', error.message)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className={style.spacer}></div>
      <header className={style.header}>
        <AppHeader />
      </header>
      {!loading && !error && (
        <main className={style.content}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={selectedIngredients} />
        </main>
      )}
    </>
  )
}
