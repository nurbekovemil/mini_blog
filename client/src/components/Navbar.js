import React from 'react'

import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../redux/actions/authAction'

import Logo from '../assets/logo.png'

export const MainNavbar = () => {
	const dispatch = useDispatch()
	const {isAuth, user} = useSelector(state => state.authReducer)
	const logoutHandler = () => {
		dispatch(logoutAction())
	}


	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="pt-1 pb-1">
			<Navbar.Brand as={Link} to={isAuth ? '/profile' : '/'}>
      <img
        alt=""
        src={Logo}
        width="200"

        className="d-inline-block align-top"
      />{' '}
    </Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link as={Link} to="/">Главная</Nav.Link>
					{!isAuth && <Nav.Link as={Link} to="/auth">Войти</Nav.Link>}
					{isAuth && 
					<NavDropdown alignRight title={user.username || ''} id="collasible-nav-dropdown">
						<NavDropdown.Item as={Link} to="/profile">Профиль</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item as={Link} to="/" onClick={logoutHandler}>Выйти</NavDropdown.Item>
					</NavDropdown>
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}