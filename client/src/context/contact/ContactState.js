import React, { useReducer } from 'react';
import axios from 'axios';

import contactContext from './contactContext';
import contactReducer from './contactReducer';

import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACTS,
	CLEAR_CONTACTS,
} from '../types';

import { URL } from '../../App';

//  CREATE INITIAL STATE
const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
	};

	//State allows us to access anything in state
	//Dispatch allows us to dispatch objects to the Reducer
	const [state, dispatch] = useReducer(contactReducer, initialState);

	//GET CONTACTS
	const getContacts = async () => {
		try {
			const res = await axios.get(`${URL}/api/contacts`);
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//ADD CONTACT
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post(`${URL}/api/contacts`, contact, config);

			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//DELETE CONTACT
	const deleteContact = async (_id) => {
		try {
			await axios.delete(`${URL}/api/contacts/${_id}`);
			dispatch({ type: DELETE_CONTACT, payload: _id });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//UPDATE CONTACT
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`${URL}/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg,
			});
		}
	};

	//SET CURRENT CONTACT
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	//CLEAR CURRNET CONTACT
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//FILTER CONTACTS
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	//CLEAR FILTERS
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	return (
		<contactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts,
				clearContacts,
			}}
		>
			{props.children}
		</contactContext.Provider>
	);
};

export default ContactState;
