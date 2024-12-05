import { useNavigate } from 'react-router-dom'
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch } from '../../services/store'
import { login } from '../../services/user/actions'
import styles from './login.module.scss'

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegisterClick = () => {
    navigate('/register')
  }

  const handlePasswordResetClick = () => {
    navigate('/forgot-password')
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    dispatch(login({ email, password }))
      .then(response => {
        if (login.rejected.match(response)) {
          setLoginError(true)
        }
      })
      .catch(error => {
        console.error('Login error:', error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className={styles.chunk}>
      <form className={styles.chunk__form} onSubmit={handleSubmitForm}>
        <h2 className={styles.chunk__title}>Вход</h2>
        <EmailInput
          onChange={e => {
            setEmail(e.target.value)
            setLoginError(false)
          }}
          value={email ?? ''}
          name="email"
          isIcon={false}
        />
        <PasswordInput
          onChange={e => {
            setPassword(e.target.value)
            setLoginError(false)
          }}
          value={password ?? ''}
          name="password"
        />
        {loginError && (
          <p className={styles.error}>Неверный логин или пароль</p>
        )}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!(email && password) || loading}
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
