import styles from './Title.module.scss'
import cn from 'classnames'

type TitleProps = {
  text: string
  subtitle?: string
  line?: boolean
  theme?: 'light' | 'dark'
}

const Title = ({ text, subtitle, line, theme = 'light' }: TitleProps) => {
  return (
    <>
      <h2 className={cn(styles.title, styles[theme])}>{text}</h2>
      {line && <div className={styles.line} /> }
      {subtitle && <h3 className={cn(styles.subtitle, styles[theme])}>{subtitle}</h3>}
    </>
  )
}

export default Title
