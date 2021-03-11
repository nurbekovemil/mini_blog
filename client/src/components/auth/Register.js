import React from 'react'
import {useSelector} from 'react-redux'
import * as yup from 'yup' 

import {registerAction} from '../../redux/actions/authAction'
import {AuthForm} from './AuthForm'


export const Register = () => {
		const isAuthLoading = useSelector(state => state.authReducer.isAuthLoading)
		const initialState = {
			username:'',
			email:'',
			password: ''
		}
		const titles = {
			username: 'Ваше имя',
			email: 'Email адрес',
			password: 'Пароль',
		}
		const validationsSchema = yup.object().shape({
			username: yup.string().typeError('* Должно быть строкой').required('* Обязательно'),
			email: yup.string().email('* Некорректный адрес').required('* Обязательно'),
			password: yup.string().typeError('* Должно быть строкой').required('* Обязательно')
		})
		// const [form, setForm] = useState({
		// 	username: '', email: '', password: ''
		// })

		// const changeForm = (event) => {
		// 	setForm({...form, [event.target.name]: event.target.value})
		// }
		// const registerHandler = () => {
		// 	dispatch(registerAction(form))
		// }
	return (
		<AuthForm 
			validationsSchema={validationsSchema}
			dispatchAction={registerAction}
			isAuthLoading={isAuthLoading}
			initial={initialState}
			titles={titles}
			button="Регистрация"
		/>
		// <Form>
		// 	<Form.Group >
		// 		<Form.Label>Ваше имя</Form.Label>
		// 		<Form.Control type="text" name="username" placeholder="Введите ваше имя" onChange={changeForm} />
		// 	</Form.Group>
		// 	<Form.Group >
		// 		<Form.Label>Email</Form.Label>
		// 		<Form.Control type="email" name="email" placeholder="Введите email" onChange={changeForm} />
		// 	</Form.Group>
		// 	<Form.Group >
		// 		<Form.Label>Пароль</Form.Label>
		// 		<Form.Control type="password" name="password" placeholder="Введите пароль" onChange={changeForm} />
		// 	</Form.Group>
		// 	<Button variant="dark" className="w-100" onClick={registerHandler}>
		// 	{isAuthLoading ? <Spinner animation="border" size="sm" variant="light" /> : 'Регистрация'}
		// 	</Button>	
		// </Form>
	
	)
}