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
		// <Formik
		// 	initialValues = {{
		// 		email: '',
		// 		password: ''
		// 	}}
		// 	validateOnBlur
		// 	validationSchema={validationsSchema}

		// 	onSubmit={(values) => dispatch(loginAction(values))}
		// 	>
		// 		{
		// 			({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit,dirty}) => (
		// 				<Form>
		// 					<Form.Group >
		// 						<Form.Label>Email</Form.Label> 
		// 						<Form.Control 
		// 							type="email" 
		// 							name="email" 
		// 							placeholder="Email адрес" 
		// 							onChange={handleChange} 
		// 							onBlur={handleBlur}
		// 							value={values.email}
		// 							isInvalid={touched.email && errors.email}
		// 						/>
		// 						<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
		// 					</Form.Group>
		// 					<Form.Group >
		// 						<Form.Label>Пароль</Form.Label>
		// 						<Form.Control 
		// 							type="password" 
		// 							name="password" 
		// 							placeholder="Пароль" 
		// 							onChange={handleChange} 
		// 							onBlur={handleBlur}
		// 							value={values.password}
		// 							isInvalid={touched.password && errors.password}
		// 							/>
		// 						<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
		// 					</Form.Group>
		// 					<Button variant="dark" className="w-100" onClick={handleSubmit} type="submit" disabled={!isValid && !dirty}>
		// 						{isAuthLoading ? <Spinner animation="border" size="sm" variant="light" /> : 'Войти'}
		// 					</Button>			
		// 				</Form>
		// 			)
		// 		}

		// </Formik>
	)
}