import './transition.scss'
import cn from 'classnames'
import styles from './Header.module.scss'

import { useState, useRef, useEffect, useCallback } from 'react'

import { Link, NavLink, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { FaBars } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

import logo from '../../assets/logo.svg'
import Button from '../UI/Button'

const links = [
  {
    text: 'Головна',
    path: '/',
  },
  {
    text: 'Мапа допомоги',
    path: '/map',
  },
]

type Theme = {
  class: string
  isLight: boolean
}

const lightTheme: Theme = {
  class: 'light',
  isLight: true,
}

const transpTheme: Theme = {
  class: 'transp',
  isLight: false,
}

const shadowTheme: Theme = {
  class: 'shadow',
  isLight: true,
}

const getTheme = (path: string) => {
  switch (path) {
    case '/':
      return transpTheme
    default:
      return lightTheme
  }
}

const Header = () => {
  const [theme, setTheme] = useState<Theme>(transpTheme)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation()

  const headerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const link = window.__env__.ADMIN_APP_URL

  const setHeaderTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
  }, [])

  const closeMenu = () => {
    if (isMobile) setIsMobile(false)
  }

  useEffect(() => {
    setHeaderTheme(getTheme(location.pathname))
  }, [location, setHeaderTheme])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setHeaderTheme(shadowTheme)
      else setHeaderTheme(getTheme(location.pathname))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location, setHeaderTheme])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element
      if (!headerRef.current?.contains(target) && !buttonRef.current?.contains(target))
        setIsMobile(false)
    }
    if (isMobile) document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobile])

  const navigation = links.map((link, i) => (
    <li key={i} className={styles.link}>
      <NavLink
        to={link.path}
        onClick={closeMenu}
        className={({ isActive }) => {
          if (isActive) return styles.active
        }}
      >
        {link.text}
      </NavLink>
    </li>
  ))

  return (
    <>
      {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Login />
      </Modal> */}
      <CSSTransition in={theme.isLight} nodeRef={headerRef} timeout={600} classNames={'header'}>
        <header ref={headerRef} className={cn(styles.header, styles[theme.class])}>
          <nav className={styles.nav}>
            <Link to='/' className={styles.logo}>
              <img src={logo} alt='Логотип Волонтера' />
            </Link>
            <div className={isMobile ? cn(styles.mobile, styles[theme.class]) : styles.container}>
              <ul className={isMobile ? styles.listMobile : styles.list}>{navigation}</ul>
                <Button color={theme.class === 'transp' ? 'light' : 'dark'} href={link}>
                  Створити організацію
                </Button>
            </div>
            <button
              ref={buttonRef}
              className={styles.buttonMenu}
              onClick={() => setIsMobile(!isMobile)}
            >
              {isMobile ? <RxCross1 size={25} /> : <FaBars size={25} />}
            </button>
          </nav>
        </header>
      </CSSTransition>
    </>
  )
}

export default Header
