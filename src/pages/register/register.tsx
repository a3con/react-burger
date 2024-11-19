import styles from './register.module.scss'
import { Register } from '../../components/register/register'

export const RegisterPage = () => {
  return (
    <section className={styles.container}>
      <Register />
    </section>
  )
}
