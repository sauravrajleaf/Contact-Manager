import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';

import setAuthToken from '../src/utils/setAuthToken';

//PRIVATE ROUTE
import PrivateRoute from './components/routing/PrivateRoute';

//CONTEXT IMPORTS
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AuthContext from './context/auth/authContext';
import AlertState from './context/alerts/AlertState';

import './App.css';

export const URL = process.env.REACT_APP_URL;

console.log('URL', URL);

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	const authContext = useContext(AuthContext);
	// useEffect(() => {
	// 	authContext.loadUser();

	// 	//eslint-disable-next-line
	// });

	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar />
							<div className='container'>
								<Alerts />
								<Switch>
									<PrivateRoute exact path='/' component={Home} />
									<Route exact path='/about' component={About} />
									<Route exact path='/register' component={Register} />
									<Route exact path='/login' component={Login} />
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
