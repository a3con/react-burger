import { IOrder } from '../../utils/interfaces'

// Function to generate a random string (for uuid)
function generateString(length: number): string {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function generateHistoryOrder(): IOrder {
  const randomId = generateString(24)
  const randomIngredientCount = Math.floor(Math.random() * 5) + 1 // (1 to 5)
  const randomIngredients = Array.from({ length: randomIngredientCount }, () =>
    generateString(24),
  )

  return {
    _id: randomId,
    ingredients: randomIngredients,
    status: 'done',
    name: `Order-${generateString(8)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: Math.floor(Math.random() * 1000) + 1,
  }
}
