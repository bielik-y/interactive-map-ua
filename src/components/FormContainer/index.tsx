import styles from './FormContainer.module.scss'
import { ReactNode } from 'react'

const FormContainer = ({children}: {children: ReactNode}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {children}
      </div>
    </div>
  )
}

export default FormContainer
