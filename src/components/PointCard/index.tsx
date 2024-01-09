import styles from './PointCard.module.scss'

import { labels } from '../../content/labels'
import { ReactComponent as LocationIcon } from '../../assets/icons/ic_location.svg'
import { SimplePoint } from '../../types'

import TimeBlock from '../TimeBlock'
import Label from '../UI/Label'

type PointCardProps = {
  point: SimplePoint
  onCardClick: (id: number) => void
}

const PointCard = ({ point, onCardClick }: PointCardProps) => {
  const options = labels.filter((label) => point.labels.includes(label.id))

  const badges = options.map((option) => {
    return (
      <Label
        key={option.id}
        IconComponent={option.icon}
        text={option.name}
        size='sm'
        isActive={false}
        theme='disabled'
      />
    )
  })

  return (
    <div className={styles.card} onClick={() => onCardClick(point.id)}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{point.organization_name}</h2>
        <div className={styles.address}>
          <LocationIcon className={styles.icon} />
          <span>{(point.formatted_address && point.formatted_address!=='') ? point.formatted_address : '(Точна адреса відсутня)'}</span>
        </div>
        <div className={styles.time}>
          <TimeBlock isOpen={point.is_open} nextState={point.next_state} />
        </div>
        <div className={styles.categories}>{badges}</div>
      </div>
    </div>
  )
}

export default PointCard
