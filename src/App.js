import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './Components/Header';
import Footer from './Components/Footer'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';

const App = () => {
  return (
    <Router>
    <Header />
    <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' Component={HomeScreen} exact />
              <Route path='/product/:id' Component={ProductScreen} />
              <Route path='/cart/:id?' Component={CartScreen} /> 
              <Route path='/admin/userlist' Component={UserListScreen} /> 
              <Route path='/login' Component={LoginScreen} />
              {/* cartscreen me :id k bd ? lgaya h as to keep id optional */}
              <Route path='/register' Component={RegisterScreen} />
              <Route path='/profile' Component={ProfileScreen} />
              <Route path='/shipping' Component={ShippingScreen} />
              <Route path='/payment' Component={PaymentScreen} />
              <Route path='/placeorder' Component={PlaceOrderScreen} />
              <Route path='/order/:id' Component={OrderScreen} />
              </Routes>
      </Container>
    </main>
      <Footer />
      </Router>
  );
}

export default App;
