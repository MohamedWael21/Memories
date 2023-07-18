import * as api from '../api'

export const signup = (form) => async (dispatch) => {
    try{
        const {data} = await api.signup(form);
        dispatch({type: "SIGNUP", payload: data});
    }catch(error){
        console.log(error.response.data);
    }
}

export const signin = (form) => async (dispatch) => {
    try{
        const {data} = await api.signin(form);
        dispatch({type: "SIGNIN", payload: data});
    }catch(error){
        console.log(error.response.data);
    }
}

export const signWithGoogle = (code) => async (dispatch) => {
    try{
        const {data} = await api.signWithGoogle(code);
        dispatch({type: "SIGNWITHGOOGLE", payload: data});
    }catch(error){
        console.log(error.response.data);
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const refreshUser = (user) => {
    return {
        type: 'REFRESHUSER',
        payload: user
    }
}