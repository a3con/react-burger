import { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import { useAppDispatch, useAppSelector } from '../../services/store'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { patchUser } from '../../services/user/actions'
import { IUser } from '../../utils/interfaces'
import { getUser } from '../../services/user/reducer'

export const Profile = () => {
  const user = useAppSelector(getUser)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [nameDisabled, setNameDisabled] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const revertState = (payload?: IUser) => {
    setName(payload?.name || user?.name || '')
    setEmail(payload?.email || user?.email || '')
    setPassword('')
    setNameDisabled(true)
    setShowControls(false)
  }

  const handleRevertClick = (e: React.FormEvent) => {
    e.preventDefault()
    revertState()
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    dispatch(patchUser({ name, email, password }))
      .unwrap() // get only payload
      .then(payload => {
        revertState(payload)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error updating user:', error)
      })
  }

  useEffect(() => {
    setShowControls(
      user?.name !== name || user?.email !== email || password !== '',
    )
  }, [user, name, email, password])

  return (
    <form className={styles.profile} onSubmit={handleSubmitForm}>
      <Input
        type={'text'}
        onChange={e => setName(e.target.value)}
        value={name ?? ''}
        name="name"
        placeholder="Имя"
        error={false}
        icon="EditIcon"
        disabled={nameDisabled}
        onIconClick={() => setNameDisabled(!nameDisabled)}
      />
      <EmailInput
        onChange={e => {
          setEmail(e.target.value)
        }}
        value={email ?? ''}
        name="email"
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        onChange={e => setPassword(e.target.value)}
        value={password ?? ''}
        name="password"
        icon="HideIcon"
      />
      {showControls && (
        <div className={styles.controls}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleRevertClick}
            disabled={loading ? true : false}
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={loading ? true : false}
            onClick={handleSubmitForm}
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}
