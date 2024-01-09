import * as Yup from 'yup'
import styles from './Login.module.scss'

import { useState } from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'

import Button from '../UI/Button'
import Input, {InputCode} from '../UI/Input'

const LoginSchema = Yup.object().shape({
  // firstName: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  // email: Yup.string().email('Invalid email').required('Required'),
})

const Login = () => {
  const [stepIndex, setStepIndex] = useState<number>(0)

  const handlePhoneSubmit = (values: PhoneFormValues) => {
    alert(JSON.stringify(values, null, 2))
    setStepIndex(1)
  }

  const handleCodeSubmit = (values: string) => {
    alert(JSON.stringify(values, null, 2))
    setStepIndex(1)
  }

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <PhoneForm onSubmit={handlePhoneSubmit} />
      case 1:
        return <CodeForm onSubmit={handleCodeSubmit}/>
      case 2:
        return <div>2</div>
      case 3:
        return <div>3</div>
      default:
        return <h1>No step match</h1>
    }
  }

  return <>{renderStep(stepIndex)}</>
}

type PhoneFormValues = {
  phone: string
}

const PhoneForm = ({ onSubmit }: { onSubmit: (values: PhoneFormValues) => void }) => {
  return (
    <>
      <Formik
        initialValues={{ phone: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values: PhoneFormValues, { setSubmitting }: FormikHelpers<PhoneFormValues>) => {
          onSubmit(values)
          setSubmitting(false)
        }}
      >
        <Form className={styles.form}>
          <h1>ВХІД</h1>
          <Field
            name='phone'
            type='phone'
            label='Ваш номер телефону:'
            placeholder='00 000 00 00'
            component={Input}
          />
          <div className={styles.info}>
            Вказуючи свій номер телефону, ви даєте згоду на отримання SMS-повідомлення з кодом
            підтвердження для авторизації у системі
          </div>
          <Button type='submit' color='yellow' size='md' maxWidth={true}>
            Увійти
          </Button>
        </Form>
      </Formik>
    </>
  )
}

const CodeForm = ({ onSubmit }: { onSubmit: (values: string) => void }) => {

  const [value, setValue] = useState<string>('')

  const handleChange = (value: string) => {
    setValue(value)
  } 

  return (
    <>
      <div className={styles.form}>
        <h2>Введіть 6-ти значний код з SMS</h2>
        <InputCode value={value} onChange={handleChange}/>
        <button className={styles.help}>Я не отримав код</button>
        <Button color='yellow' size='md' maxWidth={true} onClick={() => onSubmit(value)}>Продовжити</Button>
      </div>
    </>
  )
}

export default Login
