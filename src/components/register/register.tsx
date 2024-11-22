import { useNavigate } from 'react-router-dom'
import styles from './register.module.scss'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useAppDispatch } from '../../services/store'
import { register } from '../../services/user/actions'

export const Register = () => {
  const [name, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(register({ email, password, name }))
      // Уточнить!!!
      .then(response => {
        if (register.fulfilled.match(response)) {
          navigate('/')
        } else if (register.rejected.match(response)) {
          console.error('Registration rejected:', response)
        }
      })
      .catch(error => {
        console.error('Registration error:', error)
      })
  }

  return (
    <div className={styles.chunk}>
      <form className={styles.chunk__form} onSubmit={handleSubmitForm}>
        <h2 className={styles.chunk__title}>Регистрация</h2>
        <Input
          type="text"
          placeholder="Имя"
          onChange={e => setUserName(e.target.value)}
          value={name ?? ''}
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
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!(email && password && name)}
        >
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
