import styles from './TimeBlock.module.scss'

import { ReactComponent as ClockIcon } from '../../assets/icons/ic_clock.svg'
import { ReactComponent as ArrowUpIcon } from '../../assets/icons/ic_arrow_up.svg'
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/ic_arrow_down.svg'

import { NextState } from '../../types'
import { week } from '../../content/week'

type TimeBlockProps = {
  isOpen: boolean
  isExpanded?: boolean
  nextState: NextState
  onClick?: () => void
}

const TimeBlock = ({ isOpen, isExpanded, nextState, onClick }: TimeBlockProps) => {
  let hours = isOpen ? 'Закриється ' : 'Відкриється '
  
  //Today - 7 Tomorrow - 8 Weekday - other
  if (nextState.weekday === 7 ) hours = hours.concat('o ', nextState.time)
  else if (nextState.weekday === 8) hours = hours.concat('o ', nextState.time)
  else
    hours = hours.concat(
      'o ',
      nextState.time,
      ' ',
      week.filter((day) => day.id === nextState.weekday)[0].shortForm
    )

  return (
    <div className={styles.time} onClick={onClick}>
      <div className={styles.text}>
        <ClockIcon className={styles.icon} />
        {isOpen ? (
          <span className={styles.opened}>Відкрито</span>
        ) : (
          <span className={styles.closed}>Зачинено</span>
        )}
        <span className={styles.data}>{`(${hours})`}</span>
      </div>
      {isExpanded !== undefined ? (
        isExpanded ? (
          <ArrowUpIcon className={styles.icon} />
        ) : (
          <ArrowDownIcon className={styles.icon} />
        )
      ) : null}
    </div>
  )
}

export default TimeBlock
