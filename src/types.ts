export type SimplePoint = {
  administrative_area_id: number
  formatted_address: string
  organization_name: string
  id: number
  lat: number
  lng: number
  tz: string
  is_open: boolean
  labels: number[]
  next_state: NextState
}

export type Label = {
  id: number
  name: string
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
}

export type Point = {
  id: number
  formatted_address: string
  organization_name: string
  organization_icon: string
  is_open: boolean
  tz: string
  website: string
  number: string
  labels: number[]
  next_state: NextState
  description: string
  business_hours: {
    weekday: number
    open_hours: string
    close_hours: string
  }[]
}

export type NextState = {
  weekday: number
  time: string
}