/* eslint-disable camelcase */
import { Point, SimplePoint } from '../types'

export const simplePoints: SimplePoint[] = [
  {
    id: 1,
    administrative_area_id: 5,
    formatted_address: 'вулиця Пантелеймонівська, 5, Одеса, Одеська область, 65000',
    organization_name: 'Центр допомоги ОЦВ',
    lat: 46.468903562066224,
    lng: 30.746981460835123,
    tz: '',
    is_open: true,
    labels: [1, 3, 5],
    next_state: {
      weekday: 2,
      time: '18:00',
    },
  },
]

export const points: Point[] = [
  {
    id: 1,
    formatted_address: 'вулиця Пантелеймонівська, 5, Одеса, Одеська область, 65000',
    organization_name: 'Центр допомоги ОЦВ',
    organization_icon: '',
    is_open: true,
    tz: '',
    website: 'http://example.com',
    number: '+380 000 00 00 00',
    labels: [1, 3, 5],
    next_state: {
      weekday: 2,
      time: '18:00',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    business_hours: [
      {
        weekday: 1,
        open_hours: '9:00',
        close_hours: '18:00',
      },
    ],
  },
]
