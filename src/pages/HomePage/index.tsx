import styles from './HomePage.module.scss'
import cn from 'classnames'

import Button from '../../components/UI/Button'
import Footer from '../../components/Footer'
import MainBlock from '../../components/MainBlock'
import Title from '../../components/Title'
import Label from '../../components/UI/Label'
import DescriptionCard from '../../components/DescriptionCard'

// Image imports
import mapImage from '../../assets/images/map.jpg'
import heartImage from '../../assets/images/heart.svg'

// Icon imports
import infoIcon from '../../assets/images/card_help.svg'
import accountIcon from '../../assets/images/card_account.svg'
import locationIcon from '../../assets/images/card_location.svg'
import availableIcon from '../../assets/images/card_available.svg'

import { labels } from '../../content/labels'
import { Link } from 'react-router-dom'

const description = [
  {
    src: locationIcon,
    alt: 'Вказівник локації',
    title: 'Пошук допомоги поблизу',
    description:
      'Потрібна допомога у твоєму місті? На карті ти легко знайдеш найближчи волонтерські центри',
  },
  {
    src: availableIcon,
    alt: 'Доступність',
    title: 'Швидка допомога без черг',
    description:
      'Не хочеш стояти в довгій черзі? Ти можеш записати через інтернет або за телефоном',
  },
  {
    src: infoIcon,
    alt: 'Актуальна інформація',
    title: 'Завжди актуальна інформація',
    description: 'Центр виявився закритим? Ми показуємо актуальний графік роботи та контакти',
  },
  {
    src: accountIcon,
    alt: 'Вказівник локації',
    title: 'Всі ващі записи під рукою',
    description:
      'Забули коли зустріч? Вся інформація про ваші записи зберігається в особистому кабінеті',
  },
]

const optionButtons = [labels[1], labels[3], labels[5], labels[2]]

const link = window.__env__.ADMIN_APP_URL

const HomePage = () => {
  const sectionMain = (
    <section className={styles.main}>
      <div className='container'>
        <img className={styles.places} alt='Мапа волонтерських організацій' />
        <img className={styles.points} alt='Волонтерські центри' />
        <MainBlock />
      </div>
    </section>
  )

  const descriptionCards = description.map((item, i) => {
    return (
      <DescriptionCard
        key={i}
        src={item.src}
        alt={item.alt}
        title={item.title}
        description={item.description}
      />
    )
  })

  const sectionDescription = (
    <section className={styles.description}>
      <div className='container'>
        <Title
          text='Як ми можемо вам допомогти?'
          subtitle='«Волонтера» — це перший в Україні cервіс, що полегшує й автоматизує 
                    взаємодію між волонтерами та людьми, які потребують їхньої допомоги'
          theme='dark'
          line={true}
        />
        <div className={styles.cards}>{descriptionCards}</div>
      </div>
    </section>
  )

  const buttons = optionButtons.map((option) => {
    return (
      <Link key={option.id} to='/map' state={{ label: option.id }}>
        <Label IconComponent={option.icon} text={option.name} size='lg' theme='white' />
      </Link>
    )
  })

  const sectionHelp = (
    <section className={styles.help} style={{ backgroundImage: `url(${mapImage})` }}>
      <div className='container'>
        <Title text='Чого ви зараз потребуєте?' theme='light' />
        <div className={styles.buttons}>{buttons}</div>
      </div>
    </section>
  )

  const sectionTips = (
    <section className={styles.tips}>
      <div className={cn('container', styles.center)}>
        <img src={heartImage} alt='Cерце' />
        <Title
          text='Тримаємося разом'
          subtitle='Почніть своє знайомство з «Волонтера» зі створення 
            особистого кабінету організації для зручного користування'
          theme='dark'
        />
        <div className={styles.wrapper}>
          <Button color='yellow' size='lg' href={link}>
            Створити організацію
          </Button>
        </div>
      </div>
    </section>
  )

  return (
    <>
      {sectionMain}
      {sectionDescription}
      {sectionHelp}
      {sectionTips}
      <Footer />
    </>
  )
}

export default HomePage
