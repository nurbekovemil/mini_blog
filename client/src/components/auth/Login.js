import React from 'react'
import {useSelector} from 'react-redux'
import {loginAction} from '../../redux/actions/authAction'
import * as yup from 'yup' 
import {AuthForm} from './AuthForm'

export const Login = () => {
		// const dispatch = useDispatch()
		const isAuthLoading = useSelector(state => state.authReducer.isAuthLoading)
		const initialState = {
			email:'',
			password: ''
		}
		const titles = {
			email: 'Email адрес',
			password: 'Пароль'
		}
		const validationsSchema = yup.object().shape({
			email: yup.string().email('* Некорректный адрес').required('* Обязательно'),
			password: yup.string().typeError('* Должно быть строкой').required('* Обязательно')
		})
	return (
		<AuthForm 
			validationsSchema={validationsSchema}
			dispatchAction={loginAction}
			isAuthLoading={isAuthLoading}
			initial={initialState}
			titles={titles}
			button="Войти"
		/>
	)
}