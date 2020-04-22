const notificationReducer = (state='remove', action) => {
    switch(action.type) {
        case 'SET_NOTIF':
            return action.notification
        case 'REMOVE_NOTIF':
            return action.notification
        default:
            return state
    }
}

export const setNotif = notification => {
    return{
        type: 'SET_NOTIF',
        notification
    }
}

export const removeNotif = notification => {
    return{
        type: 'REMOVE_NOTIF',
        notification
    }
}

export default notificationReducer