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
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Error ${res.status}`)
      })
      .then(({ success, data }) => {
        if (success) return data
        return Promise.reject(`Error ${data}`)
      })
      .then(data => {
        setIngredients(data)
        setSelectedIngredients(data) // Temp
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
      <div className={style.header}>
        <AppHeader />
      </div>
      {!loading && !error && (
        <main className={style.content}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={selectedIngredients} />
        </main>
      )}
    </>
  )
}
