import cn from 'classnames'
import logo from '../../assets/logo.svg'
import styles from './Footer.module.scss'
import { formatPhone } from '../../utils/formatter'

const Footer = () => {
  const email = window.__env__.CONTACT_MAIL
  const phone = window.__env__.CONTACT_PHONE

  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.wrapper)}>
        <img src={logo} alt='Логотип Волонтера' />
        <div className={styles.data}>
          <FooterBlock title='Електронна пошта' data={email} />
          <FooterBlock title='Телефон' data={phone ? formatPhone(phone) : phone} />
        </div>
      </div>
    </footer>
  )
}

type FooterBlock = {
  title: string
  data: string
}

const FooterBlock = ({ title, data }: FooterBlock) => {
  return (
    <div className={styles.block}>
      <h5>{title}</h5>
      <span>{data}</span>
    </div>
  )
}

export default Footer
