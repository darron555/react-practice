import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAcM1PPOJWRuUk8FOV3STGyPJoSdQIgG-k'
        if (isLogin) {
             url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAcM1PPOJWRuUk8FOV3STGyPJoSdQIgG-k'
        }

        const res = await axios.post(url, authData)
        const data = res.data;

        const expDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))


    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => dispatch(logout()), time * 1000)
    }
}

export function logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}

export function authLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            dispatch(logout)
        } else {
            const expirationDate = new Date(localStorage.getItem('token'))
            if (expirationDate <= new Date()) {
                dispatch(logout)
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}