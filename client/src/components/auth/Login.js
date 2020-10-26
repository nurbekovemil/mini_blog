import React, {useState}from 'react'
import {useDispatch} from 'react-redux'

import {loginAction} from '../../redux/actions/authAction'

export const Login = () => {
		const dispatch = useDispatch()
		const [form, setForm] = useState({
			email: '', password: ''
		})
		const changeForm = (event) => {
			setForm({...form, [event.target.name]: event.target.value})
		}
		const loginHandler = () => {
			dispatch(loginAction(form))
		}
	return (
		<div className="card">
			<div className="card-body">
					   <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Email</label>
					    <input  type="email"
					    		placeholder="Введите email" 
							    name="email"
							    onChange={changeForm} 
							    className="form-control" 
							    id="exampleInputEmail1"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="exampleInputPassword1">Пароль</label>
					    <input  type="password"
					    		placeholder="Введите пароль"
					    		name="password"
					    		onChange={changeForm} 
							    className="form-control" 
							    id="exampleInputPassword1"/>
					  </div>
					  <button type="button" onClick={loginHandler} className="btn btn-primary">Войти</button>
					  </div>
					</div>
	)
}