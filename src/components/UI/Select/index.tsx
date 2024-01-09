import styles from './Select.module.scss'
import cn from 'classnames'
import { useRef, useState} from 'react'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/ic_arrow_down.svg'
import { ReactComponent as ArrowUpIcon } from '../../../assets/icons/ic_arrow_up.svg'

type SelectProps = {
  selectedId: number
  options: {
    id: number
    name: string
  }[]
  onChange: (id: number) => void
}

const Select = ({ selectedId, options, onChange }: SelectProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useOnClickOutside(isExpanded, listRef, (e: Event) => {
    if (!buttonRef.current?.contains(e.target as Node)) 
      setIsExpanded(false)
  })

  const handleButtonClick = () => {
    setIsExpanded((current) => !current)
  }

  const handleOptionClick = (id: number) => {
    if (selectedId !== id) onChange(id)
    setIsExpanded(false)
  }

  const dropdownOptions = options.map((option) => {
    return (
      <li
        key={option.id}
        className={cn(styles.text, styles.item)}
        onClick={() => handleOptionClick(option.id)}
      >
        {option.name}
      </li>
    )
  })

  return (
    <div>
      <button
        ref={buttonRef}
        className={cn(styles.button, { [styles.active]: isExpanded })}
        onClick={handleButtonClick}
      >
        <span>{options[selectedId].name}</span>
        {isExpanded ? (
          <ArrowUpIcon className={styles.icon} />
        ) : (
          <ArrowDownIcon className={styles.icon} />
        )}
      </button>
      <ul ref={listRef} className={cn(styles.list, { [styles.disabled]: !isExpanded })}>
        <div className={cn(styles.wrapper, styles.box)}>{dropdownOptions}</div>
      </ul>
    </div>
  )
}

export default Select
