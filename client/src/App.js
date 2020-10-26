import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
// router packages
import {BrowserRouter as Router} from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location';

import {Container} from 'react-bootstrap/'

import useRoutes from './routes'
// redux actions
import {authAction} from './redux/actions/authAction'
// components
import {MainNavbar} from './components/Navbar'
import Progress from './components/Progress'
import {Message} from './components/Message'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(authAction())
	}, [dispatch])
	
	const {loading, message} = useSelector(state => state.appReducer)
	const isAuth = useSelector(state => state.authReducer.isAuth)
	const routes = useRoutes(isAuth)
	if(!loading && !isAuth){
		return (
			<Progress />
		)
	}
	
  return (
  	<Router>
			<LastLocationProvider>
      <Container fluid className="p-0">
      	<MainNavbar/>
				<Container>
					{routes}
					{message.isAlert && <Message message={message.message}/>}
				</Container>	
      </Container>
			</LastLocationProvider>
     </Router>
    )
}

export default App