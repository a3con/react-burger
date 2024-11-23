// TODO: apply to forms
import { useState } from 'react'

export interface IFormData {
  [key: string]: string
}

export interface IFormDataReturn {
  value: IFormData
  setValue: React.Dispatch<React.SetStateAction<IFormData>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const useFormData = (props: IFormData): IFormDataReturn => {
  const [value, setValue] = useState<IFormData>(props)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  return { value, setValue, handleChange }
}
