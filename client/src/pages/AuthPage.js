import React from 'react'
import {Login} from '../components/auth/Login'
import {Register} from '../components/auth/Register'
import {Tabs, Tab} from 'react-bootstrap'
export const AuthPage = () => {
	return (
		<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
			<Tab eventKey="home" title="Авторизация">
				<Login/>
			</Tab>
			<Tab eventKey="profile" title="Регистрация">
			<Register/>
			</Tab>
		</Tabs>
		)
}
