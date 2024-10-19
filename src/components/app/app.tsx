import { useState, useEffect } from 'react'
import { AppHeader } from '../app-header/app-header'
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { IIngredient } from '../../utils/interfaces'
import { data } from '../../utils/data'
import style from './app.module.scss'

function getData(): Promise<IIngredient[]> {
  return new Promise(resolve => setTimeout(() => resolve(data), 1000))
}

function catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
  return promise
    .then(data => [undefined, data] as [undefined, T])
    .catch(error => [error])
}

export default function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>(
    [],
  )
  const [ingredients, setIngredients] = useState<IIngredient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [error, data] = await catchError(getData())
      if (error) {
        console.log('There was an error', error.message)
        setError(true)
      } else {
        setIngredients(data)
        setSelectedIngredients(data)
      }
      setLoading(false)
    }
    fetchData()
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
