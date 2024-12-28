import { createAction } from '@reduxjs/toolkit'
import { IOrderRequest } from '../../utils/interfaces'

export const UserOrdersActions = {
  connect: createAction<string, 'USER_ORDERS_CONNECT'>('USER_ORDERS_CONNECT'),
  disconnect: createAction('USER_ORDERS_DISCONNECT'),
  onConnecting: createAction('USER_ORDERS_CONNECTING'),
  onError: createAction<string, 'USER_ORDERS_ERROR'>('USER_ORDERS_ERROR'),
  onMessage: createAction<IOrderRequest, 'USER_ORDERS_MESSAGE'>('USER_ORDERS_MESSAGE'),
  onOpen: createAction('USER_ORDERS_OPEN'),
  onClose: createAction('USER_ORDERS_CLOSE'),
}
