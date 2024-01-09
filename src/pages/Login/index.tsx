import styles from './Login.module.scss'
import { Link } from 'react-router-dom'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import FormContainer from '../../components/FormContainer'

import { withFormik, FormikProps, FormikErrors, Form, Field, ErrorMessage } from 'formik'

type FormValues = {
  email: string
  password: string
}

const InnerForm = (props: FormikProps<FormValues>) => {
  // const { touched, errors, isSubmitting } = props
  return (
    <Form className={styles.form}>
      <Field label='Електронна пошта ' name='email' placeholder='dev@volunteera.app' component={Input}/>
      <Field label='Пароль' type='password' name='password' component={Input} onBlur={() =>{console.log('onBlur')}} />
      <Button type='submit' color='yellow' size='md' onClick={()=>{'submit'}}>Увійти</Button>
    </Form>
  )
}

type LoginFormProps = {
  initialEmail?: string
}

const LoginForm = withFormik<LoginFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || '',
      password: '',
    }
  },

  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (values.email.length < 4) {
      errors.email = 'Invalid email address'
    }
    return errors
  },

  handleSubmit: (values, { setSubmitting, setErrors }) => {
      const errors: FormikErrors<FormValues> = {}
      errors.password='invalid password'
      setErrors(errors)
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
  }
})(InnerForm)

const Login = () => {
  return (
    <FormContainer>
      <span className={styles.title}>Вхід</span>
      <LoginForm />
      <Link className={styles.link} to='/signup'>
        Sign Up here</Link>
    </FormContainer>
  )
}

export default Login
