import styles from './Button.module.scss'
import cn from 'classnames'

type ButtonProps = {
  children: string
  href?: string
  maxWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'submit' | 'reset' | 'button'
  color?: 'light' | 'dark' | 'yellow' | 'blue'
  onClick?: () => void
}

const Button = ({
  onClick,
  children,
  href,
  size = 'md',
  color = 'blue',
  type = 'button',
  maxWidth = false,
}: ButtonProps) => {
  const classes = cn(styles.button, styles[color], styles[size])
  const style = maxWidth ? { width: '100%' } : {}

  return (
    <a style={style} type={type} className={classes} {...(onClick && { onClick: onClick })} {...(href && { href: href, target: '_top' })}>
      {children}
    </a>
  )
}

export default Button
