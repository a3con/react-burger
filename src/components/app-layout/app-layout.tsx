import { AppHeader } from '../app-header/app-header'
import { Outlet } from 'react-router-dom'
import styles from './app-layout.module.scss'
export const AppLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <AppHeader />
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  )
}

