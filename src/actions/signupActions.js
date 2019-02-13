import { SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_REQUEST } from './types';
import axiosConfig from '../config/configAxios';

export const signUpUser = (userData) => (dispatch) => {
	dispatch({ type: SIGNUP_REQUEST });
	axiosConfig
		.post('/api/v1/users/', userData)
		.then((response) => {
			dispatch({
				type: SIGNUP_SUCCESS,
				payload: response.data
			});
		})
		.catch((error) => {
			dispatch({
				type: SIGNUP_ERROR,
				payload: error.response.data
			});
		});
};
