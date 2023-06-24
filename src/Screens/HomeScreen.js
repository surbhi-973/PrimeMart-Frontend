import React from 'react'
// import { useState } from 'react'
import { useEffect } from 'react'
// import products from '../products' //now fetching from database
import Product from '../Components/Product'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { Row, Col } from 'react-bootstrap'
// import axios from 'axios' //don't need anymore because of redux
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  // const [products, setProducts] = useState([])

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const { data } = await axios.get('/api/products')

    //   setProducts(data)
    // }

    // fetchProducts()

    dispatch(listProducts())

  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
          <Message variant='danger'>{error}</Message> 
      ) : (
      <Row>
      {products.map((product) => (
          <Col key={ product._id } sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
          </Col>
      ))}
      </Row>)}
      
    </>
  )
}

export default HomeScreen
