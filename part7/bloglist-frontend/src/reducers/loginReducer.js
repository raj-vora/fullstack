import loginService from '../services/loginService'
import blogService from '../services/blogService'

const reducer = (state=null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'CHECK':
            return action.data
        default:
            return state
    }
}

export const login = userDetails => {
    return async dispatch => {
        const user = await loginService.login(userDetails)
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({
            type:'LOGIN',
            data: user
        })
    }
}

export const checkUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type:'CHECK',
                data: user
            })
        }
    }
}

export default reducer