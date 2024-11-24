import styles from './forgot-password.module.scss'
import { ForgotPassword } from '../../components/forgot-password/forgot-password'

export const ForgotPasswordPage = () => {
  return (
    <section className={styles.container}>
      <ForgotPassword />
    </section>
  )
}
