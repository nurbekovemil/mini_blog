import React, {useState} from 'react'
import {Login} from '../components/auth/Login'
import {Register} from '../components/auth/Register'
import {Card, Row, Col} from 'react-bootstrap'
export const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true)
	const handleIsLogin = () => {
		setIsLogin(!isLogin)
	}
	return (
		<Row>
			<Col sm={12} md={5} className="mx-auto">
				<Card>
				<Card.Body>
					<Card.Title>{isLogin ? 'Войти в аккаунт' : 'Регистрация аккаунта'}</Card.Title>

						{isLogin ? <Login/> : <Register/>}

						<Card.Link href="#" className="mt-2" onClick={handleIsLogin}>{isLogin ? 'Регистрация':'Войти'}</Card.Link>

				</Card.Body>
			</Card>
			</Col>
		</Row>
		)
}
