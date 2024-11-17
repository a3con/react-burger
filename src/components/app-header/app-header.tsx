import { useState } from 'react'
import style from './app-header.module.scss'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

export const AppHeader = () => {
  const [activePage] = useState('main')

  return (
    <div className={style.header}>
      <a href="/" className={style.logo}>
        <Logo />
      </a>
      <nav className={style.nav}>
        <ul className={style.menu}>
          <li>
            <a
              href="#main"
              className={`${style.link} ${
                activePage == 'main' && style.active
              }`}
            >
              <BurgerIcon
                type={activePage == 'main' ? 'primary' : 'secondary'}
              />
              <span>Конструктор</span>
            </a>
          </li>
          <li>
            <a
              href="#order"
              className={`${style.link} ${
                activePage == 'order' && style.active
              }`}
            >
              <ListIcon
                type={activePage == 'order' ? 'primary' : 'secondary'}
              />
              <span>Лента заказов</span>
            </a>
          </li>
        </ul>
      </nav>
      <nav className={style.user}>
        <a
          href="#user"
          className={`${style.link} ${activePage == 'user' && style.active}`}
        >
          <ProfileIcon type={activePage == 'user' ? 'primary' : 'secondary'} />
          <span>Личный кабинет</span>
        </a>
      </nav>
    </div>
  )
}
