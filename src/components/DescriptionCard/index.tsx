import styles from './DescriptionCard.module.scss'

type DescriptionCardProps = {
  src: string
  alt?: string
  title: string
  description: string
}

const DescriptionCard = ({ src, alt = 'img', title, description }: DescriptionCardProps) => (
  <>
    <div className={styles.card}>
      <img className={styles.img} src={src} alt={alt} />
      <h4 className={styles.title}>{title}</h4>
      <span className={styles.text}>{description}</span>
    </div>
  </>
)

export default DescriptionCard
