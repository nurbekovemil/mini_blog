import React, {useState}from 'react'
import {useDispatch} from 'react-redux'

import {registerAction} from '../../redux/actions/authAction'

export const Register = () => {
		const dispatch = useDispatch()
		const [form, setForm] = useState({
			username: '', email: '', password: ''
		})

		const changeForm = (event) => {
			setForm({...form, [event.target.name]: event.target.value})
		}
		const registerHandler = () => {
			dispatch(registerAction(form))
		}
	return (
		<div className="card">
			<div className="card-body">
						<div className="form-group">
					    <label htmlFor="registerUsername">Ваше имя</label>
					    <input  type="text"
					    		placeholder="Введите ваше имя" 
							    name="username"
							    onChange={changeForm} 
							    className="form-control" 
							    id="registerUsername"/>
					  	</div>
					   <div className="form-group">
					    <label htmlFor="registerEmail">Email</label>
					    <input  type="email"
					    		placeholder="Введите email" 
							    name="email"
							    onChange={changeForm} 
							    className="form-control" 
							    id="registerEmail"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="registerPassword">Пароль</label>
					    <input  type="password"
					    		placeholder="Введите пароль"
					    		name="password"
					    		onChange={changeForm} 
							    className="form-control" 
							    id="registerPassword"/>
					  </div>
					  <button type="button" onClick={registerHandler} className="btn btn-primary">Cоздать</button>
			</div>
		</div>
	)
}