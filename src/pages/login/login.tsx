import { Login } from '../../components/login/login'
import styles from './login.module.scss'

export const LoginPage = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <Login />
    </section>
  )
}
