import React from 'react'
import { useSelector } from '../../services/store'
import { Navigate, useLocation } from 'react-router-dom'
import { getIsAuthChecked, getUser } from '../../services/user/reducer'
import { Loader } from '../loader/loader'

interface IProtectedProps {
  onlyUnAuth?: boolean
  component: React.JSX.Element
}

const Protected = ({
  onlyUnAuth = false,
  component,
}: IProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked)
  const user = useSelector(getUser)
  const location = useLocation()

  if (!isAuthChecked) {
    return <Loader text="Загрузка..." />
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/ ' } }
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return component
}

export const OnlyAuth = Protected
export const OnlyUnAuth = ({
  component,
}: {
  component: React.JSX.Element
}): React.JSX.Element => <Protected onlyUnAuth={true} component={component} />
