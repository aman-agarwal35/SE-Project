import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import {  Container,Navbar,Nav, NavDropdown} from 'react-bootstrap'
import { Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox'

const header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    console.log('logout')
    dispatch(logout())    
  }

  return <header>
      <Navbar className='header' variant='dark' collapseOnSelect expand="lg">
  <Container>
      <LinkContainer to='/'>
      <Navbar.Brand >Shopper's Delight</Navbar.Brand>
      </LinkContainer>
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Route render={({ history }) => <SearchBox history={history} />} />
      <Nav className="ml-auto">
          <LinkContainer to='/cart'>
          <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
          </LinkContainer>

          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/'>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </LinkContainer>
              
              <LinkContainer to='/wishlist'>
                <NavDropdown.Item>Wishlist</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) :  <LinkContainer to='/login'>
            <Nav.Link href="/login"><i className='fas fa-user'></i>Sign In</Nav.Link>
            </LinkContainer>
          }

          {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
          )}                     
               
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  </header>;
};

export default header;
