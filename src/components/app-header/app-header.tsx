import { cloneElement } from 'react'
import styles from './app-header.module.scss'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useMatch } from 'react-router-dom'
import { useAppSelector } from '../../services/store'
import { getUser } from '../../services/user/reducer'

interface INavLinkItemProps {
  icon: React.JSX.Element
  text: string
  to: string
}

const NavLinkItem = ({ text, to, icon }: INavLinkItemProps) => {
  const isRouteMatch = useMatch(to + '/*')

  return (
    <NavLink
      to={to}
      className={`${styles.link} ${isRouteMatch && styles.active}`}
    >
      {cloneElement(icon, { type: isRouteMatch ? 'primary' : 'secondary' })}
      <span>{text}</span>
    </NavLink>
  )
}

export const AppHeader = () => {
  const user = useAppSelector(getUser)

  return (
    <div className={styles.header}>
      <a href="/" className={styles.logo}>
        <Logo />
      </a>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li>
            <NavLinkItem
              text={'Конструктор'}
              icon={<BurgerIcon type="primary" />}
              to={'/'}
            />
          </li>
          <li>
            <NavLinkItem
              text={'Лента заказов'}
              icon={<ListIcon type="primary" />}
              to={'/feed'}
            />
          </li>
        </ul>
      </nav>
      <nav className={styles.user}>
        <NavLinkItem
          text={user?.name ? user.name : 'Личный кабинет'}
          icon={<ProfileIcon type="primary" />}
          to={'/profile'}
        />
      </nav>
    </div>
  )
}
