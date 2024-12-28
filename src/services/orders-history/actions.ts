import { createAction } from '@reduxjs/toolkit'
import { IOrderRequest } from '../../utils/interfaces'

export const OrdersHistoryActions = {
  connect: createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT'),
  disconnect: createAction('ORDERS_DISCONNECT'),
  onConnecting: createAction('ORDERS_CONNECTING'),
  onError: createAction<string, 'ORDERS_ERROR'>('ORDERS_ERROR'),
  onMessage: createAction<IOrderRequest, 'ORDERS_MESSAGE'>('ORDERS_MESSAGE'),
  onOpen: createAction('ORDERS_OPEN'),
  onClose: createAction('ORDERS_CLOSE'),
}