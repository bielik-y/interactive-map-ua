import styles from './Info.module.scss'

const Info = ({children}:{children: string}) => {
  return <span className={styles.info}>{children}</span>
}

export default Info