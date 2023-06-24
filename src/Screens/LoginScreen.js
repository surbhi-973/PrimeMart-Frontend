import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import {login} from '../actions/userActions'

const LoginScreen = () => {

    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    //yha maybe dikkt aaye aur aa hi gya, iske jgh useLocation use kro


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
          <h1>Sign In</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
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

              <Button type='submit' variant = 'primary' className='mt-3'>
                  Sign In
              </Button>
          </Form>

          <Row className='py-3'>
              <Col>
                  New Customer?{' '}
                  <Link to={redirect ? `/register?redirect=${redirect}`
                  : '/register' }>Register</Link>
              </Col>
          </Row>
    </FormContainer>
  )
}

export default LoginScreen
