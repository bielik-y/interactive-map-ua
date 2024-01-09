import styles from './Map.module.scss'

import Label from '../../components/UI/Label'
import Select from '../../components/UI/Select'
import PointDescription from '../../components/PointDescription'
import DropdownCheckbox from '../../components/DropdownCheckbox'
import GoogleMap from '../../components/GoogleMap'

import { ReactComponent as filtersIcon } from '../../assets/icons/ic_filters.svg'
import { useState, useEffect, useMemo, useCallback } from 'react'

import { getPoints } from '../../lib/requests'

import { SimplePoint } from '../../types'
import { labels as categories } from '../../content/labels'
import { regions } from '../../content/regions'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../../components/UI/Spinner'
import Info from '../../components/UI/Info'
import PointCard from '../../components/PointCard'
import { compareArraysByObjId } from '../../utils/comparison'

const Map = () => {
  const [labels, setLabels] = useState<number[]>([])
  const [region, setRegion] = useState(0)

  const [result, setResult] = useState<SimplePoint[]>([])
  const [filtered, setFiltered] = useState<SimplePoint[]>([])
  const [point, setPoint] = useState<number | null>(null)

  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const label = location.state?.label
    if (label && !labels.includes(label)) {
      setLabels((current) => [...current, label])
      navigate(location.pathname, { replace: true })
    }
  }, [location])

  useEffect(() => {
    const getPointsRequest = () => {
      // Try/catch & loading state are for future api request
      try {
        const data = getPoints()
        setResult(data)
        setFiltered(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    setLoading(true)
    getPointsRequest()
  }, [])

  useEffect(() => {
    if (result.length) {
      let array = result
      if (region) array = result.filter((item) => item.administrative_area_id === region)
      if (labels.length)
        array = result.filter((item) => labels.every((id) => item.labels.includes(id)))
      setFiltered((current) => {
        if (compareArraysByObjId(current, array)) return current
        else return array
      })
    }
  }, [result, labels, region])

  const handleRegionChange = (regionId: number) => {
    setRegion(regionId)
  }

  const handlePointClick = (pointId: number) => {
    setPoint(pointId)
  }

  const submitLabels = (selected: number[]) => {
    setLabels(selected)
  }

  const clearLabels = () => {
    setLabels([])
  }

  const handleLabelClick = useCallback(
    (labelId: number) => {
      if (!labels.includes(labelId)) setLabels((current) => [...current, labelId])
      else setLabels((current) => current.filter((num) => num !== labelId))
    },
    [labels],
  )

  const mainOptionsButtons = useMemo(
    () =>
      categories
        .filter((category) => category.id < 5)
        .map((category) => {
          return (
            <Label
              key={category.id}
              IconComponent={category.icon}
              text={category.name}
              size='md'
              theme='blue'
              isActive={labels.includes(category.id)}
              onClick={() => handleLabelClick(category.id)}
            />
          )
        }),
    [labels, handleLabelClick],
  )

  const points = useMemo(
    () =>
      filtered.map((item) => {
        return {
          id: item.id,
          lat: item.lat,
          lng: item.lng,
        }
      }),
    [filtered],
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.params}>
        <div className={styles.region}>
          <span className={styles.span}>Показати центри допомоги:</span>
          <Select selectedId={region} options={regions} onChange={handleRegionChange} />
        </div>
        <div className={styles.options}>
          <div className={styles.buttons}>{mainOptionsButtons}</div>
          <DropdownCheckbox
            IconComponent={filtersIcon}
            initialValues={labels}
            title='Фільтри'
            options={categories}
            onClear={clearLabels}
            onSubmit={submitLabels}
          />
        </div>
      </div>
      <div className={styles.content}>
        {point === null ? (
          <ul className={styles.list}>
            {!loading ? (
              !filtered.length ? (
                <Info>На жаль, не було знайдено жодної організації за вказаними параметрами</Info>
              ) : (
                filtered.map((item) => (
                  <PointCard
                    point={item}
                    key={item.id}
                    onCardClick={() => handlePointClick(item.id)}
                  />
                ))
              )
            ) : (
              <Spinner />
            )}
          </ul>
        ) : (
          <PointDescription
            pointId={point}
            onClick={() => {
              setPoint(null)
            }}
          />
        )}
        {!loading ? (
          <GoogleMap
            locations={points}
            selectedId={point ? point : null}
            onMarkerClick={handlePointClick}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default Map
