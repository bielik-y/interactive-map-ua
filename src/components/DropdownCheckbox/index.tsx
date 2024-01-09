import cn from 'classnames'
import styles from './DropdownCheckbox.module.scss'
import Checkbox from '../UI/Checkbox'
import { Label } from '../../types'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ReactComponent as ArrowUpIcon } from '../../assets/icons/ic_arrow_up.svg'
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/ic_arrow_down.svg'

type DropdownCheckboxProps = {
  title: string
  initialValues: number[]
  options: Label[]
  IconComponent?: React.ElementType
  onClear: () => void
  onSubmit: (selected: number[]) => void
}

const DropdownCheckbox = ({
  initialValues,
  IconComponent,
  title,
  options,
  onClear,
  onSubmit,
}: DropdownCheckboxProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selected, setSelected] = useState<number[]>(initialValues)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useOnClickOutside(isExpanded, listRef, (e: Event) => {
    if (!buttonRef.current?.contains(e.target as Node)) {
      setIsExpanded(false)
      setSelected(initialValues)
    }
  })

  useEffect(() => {
    setSelected(initialValues)
  }, [initialValues])

  const handleButtonClick = () => {
    if (isExpanded) {
      setSelected(initialValues)
    }
    setIsExpanded((current) => !current)
  }

  const handleItemClick = (id: number) => {
    if (!selected.includes(id)) setSelected((current) => [...current, id])
    else setSelected((current) => current.filter((num) => num !== id))
  }

  const clearCheckedArray = () => {
    onClear()
    setSelected([])
    setIsExpanded(false)
  }

  const submitCheckedArray = () => {
    setIsExpanded(false)
    onSubmit(selected)
  }

  const dropdown = options.map((option) => {
    const Icon = option.icon
    return (
      <li key={option.id} className={styles.item} onClick={() => handleItemClick(option.id)}>
        <Icon className={styles.icon} />
        <div className={styles.listWrapper}>
          <span>{option.name}</span>
          <Checkbox isChecked={selected.includes(option.id)} onChange={() => {/**/}} />
        </div>
      </li>
    )
  })

  return (
    <div className={styles.dropdown}>
      <button
        ref={buttonRef}
        className={cn(styles.button, { [styles.active]: isExpanded || selected.length })}
        onClick={handleButtonClick}
      >
        {IconComponent && <IconComponent className={styles.icon} />}
        <span className={styles.text}>{title}</span>
        {isExpanded ? (
          <ArrowUpIcon className={styles.icon} />
        ) : (
          <ArrowDownIcon className={styles.icon} />
        )}
      </button>
      <ul ref={listRef} className={isExpanded ? cn(styles.list, styles.box) : styles.disabled}>
        <div className={styles.wrapper}>{dropdown}</div>
        <div className={styles.separator} />
        <div className={styles.options}>
          <button className={styles.clear} onClick={clearCheckedArray}>
            Очистити
          </button>
          <button className={styles.show} onClick={submitCheckedArray}>
            Показати
          </button>
        </div>
      </ul>
    </div>
  )
}

export default DropdownCheckbox
