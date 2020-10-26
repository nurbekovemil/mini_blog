import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'



// pages
import {DashboardPage} from './pages/DashboardPage'
import {HomePage} from './pages/HomePage'
import {AuthPage} from './pages/AuthPage'
import {ProfilePage} from './pages/ProfilePage'
import {PostDetailPage} from './pages/PostDetailPage'


const useRoutes = (isAuth) => {
	if(isAuth) {
		return (
			<Switch>
				<Route path="/dashboard" component={DashboardPage} exact />
				<Route path="/profile" component={ProfilePage} exact />
				<Route path="/post/:id" component={PostDetailPage} exact />
				<Route path="/" component={HomePage} exact />				
				<Redirect to="/profile"/>
			</Switch>
		)
	}
		return (
			<Switch>
				<Route path='/' component={HomePage} exact />
				<Route path="/post/:id" component={PostDetailPage} exact />
				<Route path='/auth' component={AuthPage} exact/>
				<Redirect to="/"/>
			</Switch>
		)

}
export default useRoutes