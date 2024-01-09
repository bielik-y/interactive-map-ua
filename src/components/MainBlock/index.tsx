import styles from './MainBlock.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextTransition, { presets } from 'react-text-transition'

import Button from '../UI/Button'

const CHANGE_WORD_INTERVAL_MS = 2000

const action = 'Знайти організації'
const title = ['Терміново потрібні ']
const words = ['їжа?', 'одяг?', 'ліки?', 'житло?']
const subtitle = '«Волонтера» допоможе вам знайти організації та отримати потрібну допомогу якомога швидше'

const MainBlock = () => {
  const [index, setIndex] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === words.length - 1) setIndex(0)
      else setIndex((curIndex) => curIndex + 1)
    }, CHANGE_WORD_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [index])

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        {title}
        <TextTransition inline={true} className={styles.word} springConfig={presets.slow}>
          {words[index]}
        </TextTransition>
      </h1>
      <h3
        className={styles.subtitle}>
        {subtitle}
      </h3>
      <div style={{width: 'fit-content'}}>
      <Button
        color='yellow'
        size='lg'
        onClick={() => navigate('/map')}
      >{action}</Button>
      </div>
    </div>
  )
}

export default MainBlock
