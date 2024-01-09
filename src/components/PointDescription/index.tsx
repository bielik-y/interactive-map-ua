import cn from 'classnames'
import styles from './PointDescription.module.scss'
import pointImage from '../../assets/images/point.jpg'

import { Point } from '../../types'
import { ReactComponent as ArrowIcon } from '../../assets/icons/ic_arrow.svg'
import { ReactComponent as LocationIcon } from '../../assets/icons/ic_location.svg'
import { ReactComponent as PhoneIcon } from '../../assets/icons/ic_phone.svg'
import { ReactComponent as SiteIcon } from '../../assets/icons/ic_site.svg'

import { week } from '../../content/week'
import { labels } from '../../content/labels'
import { formatPhone } from '../../utils/formatter'
import { getPointById } from '../../lib/requests'

import { MouseEventHandler, useEffect, useState } from 'react'

import TimeBlock from '../TimeBlock'
import Spinner from '../UI/Spinner'

type PointDescription = {
  pointId: number
  onClick: MouseEventHandler
}

const PointDescription = ({ pointId, onClick }: PointDescription) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [point, setPoint] = useState<Point | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getPointByIdRequest = () => {
      // Try/catch & loading state are for future api request
      try {
        const data = getPointById(pointId)
        if (data) setPoint(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    setLoading(true)
    getPointByIdRequest()
  }, [pointId])

  if (point === null) {
    if (isLoading)
      return (
        <div className={styles.container}>
          <Spinner />
        </div>
      )
    else {
      return (
        <div className={styles.container}>
          <button onClick={onClick}>
            <ArrowIcon className={styles.arrow} />
            <span>Назад до списку</span>
          </button>
          <span>На жаль,сталася помилка. Повторіть запит пізніше</span>
        </div>
      )
    }
  }

  const options = labels.filter((label) => point.labels.includes(label.id))

  const gradientStyle =
    point.organization_icon && point.organization_icon !== ''
      ? {
          background:
            'linear-gradient(180deg,#000000 0%,rgba(0, 0, 0, 0) 44.79%,rgba(0, 0, 0, 0.58) 100%)',
        }
      : undefined

  const imageStyle =
    point.organization_icon && point.organization_icon !== ''
      ? {
          backgroundImage: `url(${window.__env__.API_URL}/organization/icon/${point.organization_icon})`,
        }
      : { backgroundImage: `url(${pointImage})` }

  const timetable = isExpanded
    ? week.map((day) => {
        const hours = point.business_hours.filter((interval) => interval.weekday === day.id)
        let intervals: React.ReactNode = <div>-</div>
        if (hours.length > 0)
          intervals = hours.map((gap, i) => (
            <div key={i}>{gap.open_hours.slice(0, 5) + '-' + gap.close_hours.slice(0, 5)}</div>
          ))
        return (
          <div className={styles.timetable} key={day.id}>
            <div className={styles.day}>{day.name}</div>
            <div className={styles.interval}>{intervals}</div>
          </div>
        )
      })
    : null

  return (
    <div className={styles.container}>
      <div className={styles.block} style={imageStyle}>
        <div className={styles.gradient} style={gradientStyle}>
          <button className={styles.button} onClick={onClick}>
            <ArrowIcon className={styles.arrow} />
            <span>Назад до списку</span>
          </button>
          <h1 className={styles.title}>{point.organization_name}</h1>
        </div>
      </div>
      <div className={styles.section}>
        {point.description && (
          <>
            <div className={styles.description}>{point.description}</div>
            <div className={styles.line} />
          </>
        )}
        <TimeBlock
          isOpen={point.is_open}
          isExpanded={isExpanded}
          nextState={point.next_state}
          onClick={() => setIsExpanded((current) => !current)}
        />
        {timetable}
        <div className={styles.line} />
        <div className={styles.subtitle}>Допомога:</div>
        {options.map((option) => {
          const Icon = option.icon
          return (
            <div className={styles.subsection} key={option.id}>
              <Icon className={styles.icon} />
              <span className={styles.text}>{option.name}</span>
            </div>
          )
        })}
        <div className={styles.line} />
        <div className={styles.subtitle}>Адреса:</div>
        <div className={styles.subsection}>
          <LocationIcon className={styles.icon} />
          <span className={styles.text}>
            {point.formatted_address && point.formatted_address !== ''
              ? point.formatted_address
              : '(Точна адреса відсутня)'}
          </span>
        </div>
        <div className={styles.line} />
        <div className={styles.subtitle}>Телефон:</div>
        <div className={styles.subsection}>
          <PhoneIcon className={styles.icon} />
          <span className={styles.text}>{formatPhone(point.number)}</span>
        </div>
        {point.website && point.website !== '' && (
          <>
            <div className={cn(styles.subtitle, styles.margin)}>Сайт: </div>
            <div className={styles.subsection}>
              <SiteIcon className={styles.icon} />
              <a href={point.website} className={styles.text}>
                {point.website}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PointDescription
