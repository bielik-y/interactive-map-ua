import styles from './Label.module.scss'
import cn from 'classnames'

type LabelProps = {
  IconComponent: React.ElementType
  text?: string
  size?: 'sm' | 'md' | 'lg'
  theme?: 'blue' | 'white' | 'disabled'
  isActive?: boolean
  onClick?: () => void
}

const Label = ({
  text,
  onClick,
  IconComponent,
  size = 'md',
  theme = 'blue',
  isActive = false,
}: LabelProps) => {
  const classes = cn(styles.button, styles[size], styles[theme], { [styles.active]: isActive })

  return (
    <button
      className={classes}
      disabled={theme === 'disabled' ? true : false}
      {...(onClick && { onClick: onClick })}
    >
      <IconComponent className={styles.icon} />
      {text && <span>{text}</span>}
    </button>
  )
}

export default Label
