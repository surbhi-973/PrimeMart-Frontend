import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl } from 'react-bootstrap'
import Rating from '../Components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
// import products from '../products'
// import axios from 'axios'

const ProductScreen = () => {
    const [qty, setQty] = useState(1)

    const params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // const product = products.find((p) => p._id === params.id)

    // const [product, setProduct] = useState({})

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        // const fetchProduct = async () => {
        //   const { data } = await axios.get(`/api/products/${params.id}`)
    
        //   setProduct(data)
        // }
    
        // fetchProduct()

        dispatch(listProductDetails(params.id))

      },[dispatch, params.id])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)

        //yha history.push was not working so I used useNavigate hook
    }

  return (
    <>
          <Link className='btn btn-light my-3' to='/'>
              Go Back
          </Link>
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
              <Row>
              <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                  <ListGroup variant='flush'>
                      <ListGroupItem>
                          <h3>{ product.name }</h3>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Rating value={product.rating} text={ `${product.numReviews} reviews` } />
                      </ListGroupItem>
                      <ListGroupItem>
                          Price: ${product.price}
                      </ListGroupItem>
                      <ListGroupItem>
                          Description: {product.description}
                      </ListGroupItem>
                  </ListGroup>
              </Col>
              <Col md={3}>
                  <Card>
                      <ListGroup>
                          <ListGroupItem>
                              <Row>
                                  <Col>Price:</Col>
                                  <Col>
                                      <strong>${ product.price }</strong>
                                  </Col>
                              </Row>
                          </ListGroupItem>

                          <ListGroupItem>
                              <Row>
                                  <Col>Status:</Col>
                                  <Col>
                                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                  </Col>
                              </Row>
                          </ListGroupItem>

                              {product.countInStock > 0 && (
                                  <ListGroupItem>
                                      <Row>
                                          <Col>Quantity:</Col>
                                          <Col>
                                              <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                  {
                                                      [...Array(product.countInStock).keys()].map((x) => (
                                                          <option key={x + 1} value={x + 1}>
                                                              {x + 1}
                                                          </option>
                                                      ))
                                                  }
                                              </FormControl>
                                          </Col>
                                      </Row>
                                  </ListGroupItem>
                          )}  

                          <ListGroupItem>
                                  <Button
                                      onClick={addToCartHandler}
                                      className='btn-block' type='button' disabled={product.countInStock === 0}>
                                  Add to Cart
                              </Button>
                          </ListGroupItem>
                      </ListGroup>
                  </Card>
              </Col>
          </Row>
          ) }
          
    </>
  )
}

export default ProductScreen
