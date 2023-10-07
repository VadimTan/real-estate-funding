import { configureStore } from '@reduxjs/toolkit';

const defaultState = {
	isLoggedIn: false,
	token: '',
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'IS_LOGGED':
			return { ...state, isLoggedIn: true, token: action.token };
		case 'IS_NOT_LOGGED':
			return { ...state, isLoggedIn: false };
		default:
			return state;
	}
};

const store = configureStore(reducer);
