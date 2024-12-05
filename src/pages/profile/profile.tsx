import { Link, NavLink, Outlet } from 'react-router-dom'
import { useDispatch } from '../../services/store'
import { logout } from '../../services/user/actions'
import styles from './profile.module.scss'

export const ProfilePage = (): React.JSX.Element => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <section className={styles.profile}>
      <nav className={styles.profile__sidebar}>
        <ul className={styles.sidebar}>
          <li>
            <NavLink
              end
              className={({ isActive }) =>
                `${styles.sidebar__link} ${isActive && styles.active}`
              }
              to="/profile"
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/profile/orders"
              className={({ isActive }) =>
                `${styles.sidebar__link} ${isActive && styles.active}`
              }
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <Link
              className={styles.sidebar__link}
              onClick={handleLogout}
              to={'/login'}
            >
              Выход
            </Link>
          </li>
        </ul>
        <p className={styles.sidebar__footnote}>
          В этом разделе вы можете
          <br /> изменить свои персональные данные
        </p>
      </nav>
      <div className={styles.profile__content}>
        <Outlet />
      </div>
    </section>
  )
}
