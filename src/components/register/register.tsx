import { useNavigate } from 'react-router-dom'
import styles from './register.module.scss'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'

export const Register = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
        <h2 className={styles.chunk__title}>Регистрация</h2>
        <Input
          type="text"
          placeholder="Имя"
          onChange={e => setUserName(e.target.value)}
          value={userName ?? ''}
          name="name"
          size="default"
        />
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
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.chunk__tools}>
        <div className={styles.chunk__option}>
          <p>Уже зарегистрированы?</p>
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
