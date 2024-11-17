import { AppHeader } from '../app-header/app-header'
import { Outlet } from 'react-router-dom'
import style from './app-layout.module.scss'
export const AppLayout = () => {
  return (
    <>
      <header className={style.header}>
        <AppHeader />
      </header>
      <main className={style.content}>
        <Outlet />
      </main>
    </>
  )
}

