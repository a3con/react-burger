import { ForgotPassword } from '../../components/forgot-password/forgot-password'
import styles from './forgot-password.module.scss'

export const ForgotPasswordPage = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <ForgotPassword />
    </section>
  )
}
