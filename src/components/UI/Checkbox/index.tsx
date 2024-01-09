import styles from './Checkbox.module.scss'

type CheckboxProps = {
  isChecked: boolean
  onChange: () => void
}

const Checkbox = ({ isChecked, onChange }: CheckboxProps) => (
  <label className={styles.checkbox}>
    <input type='checkbox' checked={isChecked} onChange={onChange} />
    <label />
  </label>
)

export default Checkbox
