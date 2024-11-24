import { useNavigate } from 'react-router-dom'
import styles from './forgot-password.module.scss'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { resetPassword } from '../../utils/api'

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const goToLoginPage = () => {
    navigate('/login')
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    resetPassword({ email })
      .then(() => {
        localStorage.setItem('isResetPassword', 'true')
        navigate('/reset-password')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const isResetPassword = localStorage.getItem('isResetPassword')
    if (isResetPassword === 'true') {
      navigate('/reset-password')
    }
  }, [navigate])

  return (
    <div className={styles.chunk}>
      <form className={styles.chunk__form} onSubmit={handleSubmitForm}>
        <h2 className={styles.chunk__title}>Восстановление пароля</h2>
        <EmailInput
          onChange={e => setEmail(e.target.value)}
          value={email ?? ''}
          name="email"
          placeholder="Укажите e-mail"
          isIcon={false}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={loading}
        >
          Восстановить
        </Button>
      </form>
      <div className={styles.chunk__tools}>
        <div className={styles.chunk__option}>
          <p>Вспомнили пароль?</p>
          <Button
            extraClass={styles.chunk__action}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={goToLoginPage}
          >
            Войти
          </Button>
        </div>
      </div>
    </div>
  )
}
