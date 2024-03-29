import React, { useReducer } from 'react';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types';

import { URL } from '../../App';

//CREATE INITIAL STATE
const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true,
		error: null,
	};

	//STATE ALLOWS US TO USE ANYTHING WE PUT IN THE STATE
	//DISPATCH ALLOWS US TO DISPATCH OBJECTS,ACTIONS,METHODS OR ANYTHING TO REDUCER
	const [state, dispatch] = useReducer(authReducer, initialState);

	//ACTIONS

	//LOAD USER - WHICH IS GOING TO TAKE CARE OF WHICH USER IS LOGGED AND ITS GOING TO HIT THAT AUTH ENDPOINT AND GET THE USER DATA
	const loadUser = async () => {
		// LOAD TOKEN INTO GLOBAL HEADERS

		setAuthToken(localStorage.token);
		console.log('I am in auth');

		try {
			const res = await axios.get(`${URL}/api/auth`);

			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
			});
		}
	};

	//REGISTER USER - WHICH SIGNS THE USER UP AND GETS A TOKEN BACK
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post(`${URL}/api/user`, formData, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	//LOGIN USER - WHICH WILL LOG THE USER IN AND GET THE TOKEN
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Types': 'application/json',
			},
		};

		try {
			const res = await axios.post(`${URL}/api/auth`, formData, config);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	//LOGOUT - WHICH WILL DESTROY THE TOKEN AND JUST CLEAR EVERYTHIN UP
	const logout = () => dispatch({ type: LOGOUT });

	//CLEAR_ERRORS - TO CLEAR OUT ANY ERRORS IN THE STATE
	const clearErrors = () =>
		dispatch({
			type: CLEAR_ERRORS,
		});

	//BY SURROUNDING THE COMPONENT IN THE SPECIFIC PROVIDER TAGS WE GET ACCESS TO THE STATE AND FUCNTIONS OF THE PROVIDER
	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				loadUser,
				login,
				logout,
				clearErrors,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
