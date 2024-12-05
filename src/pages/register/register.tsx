import { Register } from '../../components/register/register'
import styles from './register.module.scss'

export const RegisterPage = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <Register />
    </section>
  )
}
