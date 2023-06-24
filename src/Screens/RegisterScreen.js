import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import {register} from '../actions/userActions'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    
    const dispatch = useDispatch()
    
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

  return (
    <FormContainer>
          <h1>Sign Up</h1>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
              <FormGroup controlId='name'>
                  <FormLabel>Name</FormLabel>
                  <FormControl type='name' placeholder='Enter name' value={name}
                      onChange={(e) => setName(e.target.value) }></FormControl>
              </FormGroup>

              <FormGroup controlId='email'>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl type='email' placeholder='Enter email' value={email}
                      onChange={(e) => setEmail(e.target.value) }></FormControl>
              </FormGroup>

              <FormGroup controlId='password'>
                  <FormLabel>Password</FormLabel>
                  <FormControl type='password' placeholder='Enter password' value={password}
                      onChange={(e) => setPassword(e.target.value) }></FormControl>
              </FormGroup>

              <FormGroup controlId='confirmpassword'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl type='password' placeholder='Confirm password' value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value) }></FormControl>
              </FormGroup>

              <Button type='submit' variant = 'primary'>
                  Register
              </Button>
          </Form>

          <Row className='py-3'>
              <Col>
                  Have an Account?{' '}
                  <Link to={redirect ? `/login?redirect=${redirect}`
                  : '/login' }>Login</Link>
              </Col>
          </Row>
    </FormContainer>
  )
}

export default RegisterScreen
