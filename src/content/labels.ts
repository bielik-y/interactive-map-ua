import { ReactComponent as aidIcon } from '../assets/icons/ic_aid.svg'
import { ReactComponent as houseIcon } from '../assets/icons/ic_bed.svg'
import { ReactComponent as foodIcon } from '../assets/icons/ic_food.svg'
import { ReactComponent as heatIcon } from '../assets/icons/ic_heat.svg'
import { ReactComponent as healthIcon } from '../assets/icons/ic_med.svg'
import { ReactComponent as chargeIcon } from '../assets/icons/ic_charge.svg'
import { ReactComponent as clothesIcon } from '../assets/icons/ic_clothes.svg'
import { Label } from '../types'

export const labels: Label[] = [
  {
    id: 1,
    name: 'Їжа',
    icon: foodIcon,
  },
  {
    id: 2,
    name: 'Тепло',
    icon: heatIcon,
  },
  {
    id: 3,
    name: 'Одяг',
    icon: clothesIcon,
  },
  {
    id: 4,
    name: 'Зарядки',
    icon: chargeIcon,
  },
  { id: 5, name: 'Гуманітарна допомога', icon: aidIcon },
  {
    id: 6,
    name: 'Житло',
    icon: houseIcon,
  },
  { id: 7, name: 'Медична допомога', icon: healthIcon },
]
