import './slider.scss'
import { useState, useEffect } from 'react'
import arrowImage from '../../assets/icons/ic_arrow.svg'

const SectionSlider = ({ listItem, listImage }) => {

    const [current, setCurrent] = useState(0)

    const onItemClick = (index) => {
        setCurrent(index)
    }

    const changeSlide = () => {
        setCurrent(current => (current === listItem.length - 1 ? 0 : current+1))
        console.log('tick')
    }

    useEffect(() => {

        const interval = setInterval(() => {
            changeSlide()
        }, 4000)

        return () => {
            clearInterval(interval)
        }

    });


    const list = (
        listItem.map((item, i) => {
            return (
                <Item
                    key={i}
                    text={item.text}
                    position={i + 1}
                    onItemClick={onItemClick}
                    isActive={i === current ? true : false}></Item>
            )
        })
    )

    return (
        <div className='slider-wrapper'>
            <div className="list">
                {list}
            </div>
            <Slide src={listImage[current].src} alt={listImage[current].alt} />
        </div>
    )

}

const Slide = ({ src, alt }) => {
    return (
        <>
            <img className='slide' src={src} alt={alt} />
        </>
    )
}

const Item = ({ text, position, isActive = false, onItemClick }) => {
    return (
        <div className={'list__item' + (isActive ? ' active' : '')} onClick={() => onItemClick(position - 1)}>
            <span>{position < 10 ? '0' + position : position}</span>
            <h4>{text}</h4>
            <img src={arrowImage} alt='Показчик'></img>
            {/* {isActive ? <img src={arrowImage} alt='Показчик'></img> : null} */}
        </div >
    )
}

export default SectionSlider
