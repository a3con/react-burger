import { useNavigate } from 'react-router-dom'
import styles from './login.module.scss'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegisterClick = () => {
    navigate('/register')
  }

  const handlePasswordResetClick = () => {
    navigate('/forgot-password')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.login}>
      <form className={styles.login__form} onSubmit={handleLogin}>
        <h2 className={styles.login__title}>Вход</h2>
        <EmailInput
          onChange={e => setEmail(e.target.value)}
          value={email ?? ''}
          name={'email'}
          isIcon={false}
        />
        <PasswordInput
          onChange={e => setPassword(e.target.value)}
          value={password ?? ''}
          name={'password'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.login__tools}>
        <div className={styles.login__option}>
          <p>Вы — новый пользователь?</p>
          <Button
            extraClass={styles.login__action}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleRegisterClick}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.login__option}>
          <p>Забыли пароль?</p>
          <Button
            extraClass={styles.login__action}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handlePasswordResetClick}
          >
            Восстановить пароль
          </Button>
        </div>
      </div>
    </div>
  )
}
