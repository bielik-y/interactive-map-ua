import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { replace: true })
  }, [])

  return (
    <div className={styles.container}>
      <h2>Сторінку не знайдено 😞</h2>
      <Link to='/'>Головна</Link>
    </div>
  )
}

export default NotFound
