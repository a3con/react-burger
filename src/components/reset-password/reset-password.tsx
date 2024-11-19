import { useNavigate } from 'react-router-dom'
import styles from './reset-password.module.scss'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmCode, setConfirmCode] = useState('')
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
  }

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
        <Button htmlType="submit" type="primary" size="medium">
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
            onClick={handleLoginClick}
          >
            Войти
          </Button>
        </div>
      </div>
    </div>
  )
}
