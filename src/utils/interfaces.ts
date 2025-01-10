import { IResponseSuccess } from "./api";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IUser {
  name: string
  email: string
  password?: string
}

export interface IOrder {
  _id: string
  ingredients: string[]
  name: string
  number: number
  status: keyof typeof OrderStatuses
  createdAt: string
  updatedAt: string
  owner: string
  __v: number
}

export interface IOrderResponse {
  orders: IOrder[]
  total: number | undefined
  totalToday: number | undefined
}

export interface IOrderRequest extends IOrderResponse, IResponseSuccess {}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum OrderStatuses {
  pending,
  created,
  done,
}