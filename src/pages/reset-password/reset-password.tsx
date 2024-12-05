import { ResetPassword } from '../../components/reset-password/reset-password'
import styles from './reset-password.module.scss'

export const ResetPasswordPage = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <ResetPassword />
    </section>
  )
}
