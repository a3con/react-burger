import { useNavigate } from 'react-router-dom'
import {
  Input,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { updatePassword } from '../../utils/api'
import styles from './reset-password.module.scss'

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmCode, setConfirmCode] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const goToLoginPage = () => {
    navigate('/login')
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    updatePassword({ newPassword, confirmCode })
      .then(() => {
        localStorage.removeItem('isResetPassword')
        goToLoginPage()
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const isResetPassword = localStorage.getItem('isResetPassword')
    if (isResetPassword !== 'true') {
      navigate('/forgot-password')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.chunk}>
      <form className={styles.chunk__form} onSubmit={handleSubmitForm}>
        <h2 className={styles.chunk__title}>Восстановление пароля</h2>
        <PasswordInput
          onChange={e => setNewPassword(e.target.value)}
          value={newPassword ?? ''}
          name="password"
          placeholder="Введите новый пароль"
        />
        <Input
          type="text"
          onChange={e => setConfirmCode(e.target.value)}
          value={confirmCode ?? ''}
          placeholder={'Введите код из письма'}
          name="token"
          size="default"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={loading}
        >
          Сохранить
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
