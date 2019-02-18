import { ADD_EMAIL , ADD_ERROR, ADD_REQUEST, UPDATE_REQUEST, UPDATE_ERROR, UPDATE_PASSWORD} from './types';
import launchToaster from '../helpers/toaster';
import axiosConfig from '../config/configAxios';

export const addEmail = (email) => async dispatch => {
    dispatch({ type: ADD_REQUEST });    
    await axiosConfig.post('/api/v1/users/password_reset/', email)
    .catch(error=> {
        const errors = JSON.parse(error.request.response)
        dispatch ({
            type: ADD_ERROR,
            payload: errors
        });
        launchToaster(errors.errors.message, 'toastFail', 'descFail', 'fail')
    })
    .then(res => {
        if (res){
            dispatch ({
                type: ADD_EMAIL,
                payload: res.data.user
            });
            launchToaster(res.data.user.message, 'toastSuccess', 'descSuccess', 'success')
        }
    })
};


export const updatePassword = (password) => async dispatch => {
    dispatch({ type: UPDATE_REQUEST });
    await axiosConfig.put(`/api/v1/users/password_update/${password.token}`, password)
    .catch(error=> {
        console.log("Error", JSON.parse(error.request.response))
        
        const errors = JSON.parse(error.request.response)
        dispatch ({
            type: UPDATE_ERROR,
            payload: errors
        });
        launchToaster(errors.errors.password, 'toastFail', 'descFail', 'fail')
    })

    .then(res=> {
        // console.log("Response", res)
        if (res){
            dispatch ({
                type: UPDATE_PASSWORD,
                payload: res.data
            });
            
            launchToaster(res.data.message, 'toastSuccess', 'descSuccess', 'success')
        }
    })
};
