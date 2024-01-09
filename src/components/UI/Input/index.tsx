import styles from './Input.module.scss'
import MaskedInput from 'react-text-mask'
import ReactCodeInput from 'react-code-input'
import { FieldProps } from 'formik'
import { useState, ReactNode } from 'react'
import { ReactComponent as EmailIcon } from '../../../assets/icons/ic_mail.svg'
import { ReactComponent as PhoneIcon } from '../../../assets/icons/ic_phone.svg'
import { ReactComponent as InvisibleIcon } from '../../../assets/icons/ic_invisible.svg'
import { ReactComponent as VisibleIcon } from '../../../assets/icons/ic_visible.svg'

type InputProps = {
  label?: string
  type?: 'password' | 'text' | 'email' | 'phone'
}

const Input = ({ label, type = 'text', field, form, ...props }: InputProps & FieldProps) => {
  let inputField: ReactNode
  switch (type) {
    case 'password':
      inputField = <InputPassword field={field} form={form} {...props} />
      break
    case 'email':
      inputField = <InputEmail field={field} form={form} {...props} />
      break
    case 'phone':
      inputField = <InputPhone field={field} form={form} {...props} />
      break
    default:
      inputField = <InputText field={field} form={form} {...props} />
  }

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={field.name}>
          {label}
        </label>
      )}
      <div className={styles.wrapper}>{inputField}</div>
      {form.touched[field.name] && form.errors[field.name] && (
        <div className={styles.error}>{form.errors[field.name] as string}</div>
      )}
    </div>
  )
}

const InputText = ({ field, form, ...props }: FieldProps) => {
  return <input type='text' className={styles.input} {...field} {...props} />
}

const InputEmail = ({ field, form, ...props }: FieldProps) => {
  return (
    <>
      <input type='email' className={styles.input} {...field} {...props} />
      <EmailIcon className={styles.icon} />
    </>
  )
}

const InputPhone = ({ field, form, ...props }: FieldProps) => {
  const AREA_CODE = '+380'

  return (
    <>
      <div className={styles.phone}>
        <div className={styles.digits}>{AREA_CODE}</div>
        <MaskedInput
          mask={[/\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
          guide={false}
          {...field}
          {...props}
        />
      </div>
      <PhoneIcon className={styles.icon} />
    </>
  )
}

const InputPassword = ({ field, form, ...props }: FieldProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <input
        type={isVisible ? 'text' : 'password'}
        className={styles.input}
        {...field}
        {...props}
      />
      <button
        type='button'
        className={styles.button}
        onClick={() => setIsVisible((current) => !current)}
      >
        {isVisible ? (
          <InvisibleIcon className={styles.active} />
        ) : (
          <VisibleIcon className={styles.icon} />
        )}
      </button>
    </>
  )
}

const InputCode = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <ReactCodeInput
      value={value}
      onChange={onChange}
      className={styles.code}
      fields={6}
      name='code'
      type='number'
      inputMode='numeric'
    />
  )
}

export { InputCode }
export default Input
