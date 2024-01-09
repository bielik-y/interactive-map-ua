import { points, simplePoints } from '../content/points'
import { SimplePoint } from '../types'

export const getPoints = (): SimplePoint[] => {
  return simplePoints
}

export const getPointById = (id: number) => {
  return points.find((item) => item.id === id)
}
