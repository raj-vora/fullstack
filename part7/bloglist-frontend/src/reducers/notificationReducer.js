const reducer = (state='remove', action) => {
    switch(action.type) {
        case 'SET_NOTIF':
            return action.notification
        case 'REMOVE_NOTIF':
            return action.notification
        default:
            return state
    }
}

export const setNotif = (notification,time) => {
    return async dispatch =>{
        dispatch({
            type: 'SET_NOTIF',
            notification
        })
        setTimeout(() => {
            dispatch(removeNotif('remove'))
        }, time*1000)
    }
}

export const removeNotif = notification => {
    return{
        type: 'REMOVE_NOTIF',
        notification
    }
}

export default reducer