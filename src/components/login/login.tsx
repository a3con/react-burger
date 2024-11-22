import { useNavigate } from 'react-router-dom'
import styles from './login.module.scss'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useAppDispatch } from '../../services/store'
import { login } from '../../services/user/actions'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRegisterClick = () => {
    navigate('/register')
  }

  const handlePasswordResetClick = () => {
    navigate('/forgot-password')
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div className={styles.chunk}>
      <form className={styles.chunk__form} onSubmit={handleSubmitForm}>
        <h2 className={styles.chunk__title}>Вход</h2>
        <EmailInput
          onChange={e => setEmail(e.target.value)}
          value={email ?? ''}
          name="email"
          isIcon={false}
        />
        <PasswordInput
          onChange={e => setPassword(e.target.value)}
          value={password ?? ''}
          name="password"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!(email && password)}
        >
          Войти
        </Button>
      </form>
      <div className={styles.chunk__tools}>
        <div className={styles.chunk__option}>
          <p>Вы — новый пользователь?</p>
          <Button
            extraClass={styles.chunk__action}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleRegisterClick}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.chunk__option}>
          <p>Забыли пароль?</p>
          <Button
            extraClass={styles.chunk__action}
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
