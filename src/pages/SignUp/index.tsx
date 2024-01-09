import styles from './SignUp.module.scss'
import { Link } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'

const SignUp = () => {
  return (
    <FormContainer>
      <span>Sign Up</span>
        <Link to='/login'>Login here</Link>
    </FormContainer>
  )
}

export default SignUp
