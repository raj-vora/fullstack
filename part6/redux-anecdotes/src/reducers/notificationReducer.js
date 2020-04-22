const notificationReducer = (state='Hello', action) => {
    switch(action.type) {
        case 'SET_NOTIF':
            return action.notification
        default:
            return state
    }
}

export const notifChange = notification => {
    return{
        type: 'SET_NOTIF',
        notification
    }
}

export default notificationReducer